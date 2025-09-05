import ApiError from "../util/error";

export default (
	req: Request,
	env: Env,
	ctx: ExecutionContext,
	path: string[],
) => {
	if (path[1]) {
		if (path[1] === "signup" && req.method === "POST") {
			// /users/signup
			User;
		} else if (path[1] === "login" && req.method === "POST") {
			// /users/login
		} else if (path[1] === "logout" && req.method === "POST") {
			// /users/logout
		} else if (path[1] === "current" && req.method === "GET") {
			// /users/current
		} else {
			throw new ApiError(`${req.method} ${path.join("/")} invalid`);
		}
	}
};
