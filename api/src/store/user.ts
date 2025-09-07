import { Password } from "../util/password";

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
		const hash = await Password.hash(us.password, env.SALT);

		const { meta } = await env.DB.prepare(
			"INSERT INTO users(username, email, hash, gender) VALUES(?, ?, ?, ?);",
		)
			.bind(us.username, us.email, hash, us.gender)
			.run();

		return {
			id: meta.last_row_id,
			username: us.username,
			email: us.email,
			gender: us.gender,
			accessLevel: 100,
			isVerified: 0,
		} as User;
	};

	export const getByUsername = async (env: Env, username: User["username"]) => {
		return await env.DB.prepare(
			"SELECT id, username, email, hash, gender, accessLevel, isVerified, createdOn FROM users WHERE username = ?;",
		)
			.bind(username)
			.first<UserDao>();
	};

	export const getAll = async (env: Env) => {
		const { results } = await env.DB.prepare(
			"SELECT id, username, email, gender, accessLevel, isVerified FROM users ORDER BY createdOn DESC;",
		).all<User>();

		return results;
	};

	export const get = async (env: Env, id: User["id"]) => {
		return await env.DB.prepare(
			"SELECT id, username, email, gender, accessLevel, isVerified, FROM users WHERE id = ?;",
		)
			.bind(id)
			.first<User>();
	};

	export const verify = async (env: Env, id: User["id"]) => {
		const { success } = await env.DB.prepare(
			"UPDATE users SET isVerified = 1 WHERE id = ?;",
		)
			.bind(id)
			.run();

		return success;
	};
}
