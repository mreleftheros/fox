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
	export const set = () => {};
}
