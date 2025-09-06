export namespace User {
	export const validateSignup = <T extends UserSignup>(
		us: T,
	): UserValidation => {
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let error = "";
		const errors: UserErrors = {};
		const fieldLen = Object.keys(us).length;

		if (
			!("username" in us) ||
			!("email" in us) ||
			!("password" in us) ||
			!("gender" in us) ||
			fieldLen !== 4
		) {
			error = "missing data";
		}

		if (error.length > 0) {
			return { error };
		}

		if (typeof us.username !== "string") {
			us.username = "";
		} else if (typeof us.email !== "string") {
			us.email = "";
		} else if (typeof us.password !== "string") {
			us.password = "";
		}

		if (us.username.length === 0) {
			errors.username = "username cannot be empty";
		} else if (us.username.length < 4) {
			errors.username = "username min length: 4";
		}

		if (us.email.length === 0) {
			errors.email = "email cannot be empty";
		} else if (!regex.test(us.email)) {
			errors.email = "email is invalid";
		}

		if (us.password.length === 0) {
			errors.password = "password cannot be empty";
		} else if (us.password.length < 6) {
			errors.password = "password min length: 6";
		}

		if (Object.keys(errors).length > 0) {
			error = "authentication failed";
			return { error, errors };
		}

		return { data: us };
	};
	export const set = async (env: Env, us: UserSignup) => {
		const hashedPassword = await getHashedPassword(env, password);
		const date = getSqlDate();

		const { meta } = await env.DB.prepare('INSERT INTO users(username, password) VALUES(?, ?);').bind(username, hashedPassword).run();

		return {
			id: meta.last_row_id,
			username,
			accessLevel: 100,
			isVerified: 0,
			updatedAt: date,
		} as UserItem;
	}

	static async login(env: Env, credentials: UserLogin) {
		const { username, password } = credentials;
		const user = await env.DB.prepare('SELECT id, username, password, accessLevel, isVerified, updatedAt FROM users WHERE username = ?;')
			.bind(username)
			.first<UserDao>();
		if (!user) return null;

		const passwordMatches = await comparePassword(env, user.password, password);
		if (!passwordMatches) return null;

		const { password: pw, ...rest } = user;

		return rest as UserItem;
	}

	static async getAll(env: Env) {
		const { results } = await env.DB.prepare(
			'SELECT id, username, accessLevel, isVerified, updatedAt FROM users ORDER BY updatedAt;'
		).all<UserItem>();

		return results;
	}

	static async getById(env: Env, id: UserItem['id']) {
		return await env.DB.prepare('SELECT id, username, accessLevel, isVerified, updatedAt FROM users WHERE id = ?;')
			.bind(id)
			.first<UserItem>();
	}

	static async verify(env: Env, id: UserItem['id']) {
		const { success } = await env.DB.prepare('UPDATE users SET isVerified = 1 WHERE id = ?;').bind(id).run();

		return success;
	}
}
