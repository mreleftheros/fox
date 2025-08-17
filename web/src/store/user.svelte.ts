import {
	users_current_get,
	users_login_post,
	users_logout_post,
	users_signup_post,
} from "../service/api/user.svelte";

export default (() => {
	let value = $state<User | null>(null);
	let isLoading = $state(false);

	const signup = async (us: UserSignup) => {
		const { error, data, errors } = await users_signup_post(us);
		if (error) {
			return { error, errors };
		} else if (data) {
			value = data;
		}
	};

	const login = async (ul: UserLogin) => {
		const { error, data } = await users_login_post(ul);
		if (error) {
			return error;
		} else if (data) {
			value = data;
		}
	};

	const getCurrent = async () => {
		const { error, data } = await users_current_get();
		if (error) {
			value = null;
		} else if (data) {
			value = data;
		}
	};

	const logout = async () => {
		const isOk = await users_logout_post();
		if (isOk) {
			value = null;
		}
	};

	return {
		get value() {
			return value;
		},
		get isLoading() {
			return isLoading;
		},
		signup,
		login,
		logout,
		getCurrent,
	};
})();
