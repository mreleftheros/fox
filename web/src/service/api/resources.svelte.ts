import { PUBLIC_API_HOSTNAME } from "$env/static/public";

const URL = `http://${PUBLIC_API_HOSTNAME}/v1/resources`;

export const resources_get = async () => {
	const res = await fetch(URL, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return (await res.json()) as ApiResponse<Resources>;
};
