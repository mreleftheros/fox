import { PUBLIC_API_HOSTNAME } from "$env/static/public";

const URL = `http://${PUBLIC_API_HOSTNAME}/v1/users`;

export const users_signup_post = async (us: UserSignup) => {
	const res = await fetch(`${URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(us),
	});
	return (await res.json()) as ApiResponse<User, UserErrors>;
};

export const users_login_post = async (ul: UserLogin) => {
	const res = await fetch(`${URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(ul),
	});
	return (await res.json()) as ApiResponse<User>;
};

export const users_current_get = async () => {
	const res = await fetch(`${URL}/current`, {
		credentials: "include",
	});
	return (await res.json()) as ApiResponse<User>;
};

export const users_logout_post = async () => {
	const res = await fetch(`${URL}/logout`, {
		method: "POST",
		credentials: "include",
	});
	return res.ok && res.status === 204;
};
