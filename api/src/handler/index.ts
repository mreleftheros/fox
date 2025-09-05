import { json } from "../util/response";
import userHandler from "./user";

export const handleApi = (
	req: Request,
	env: Env,
	ctx: ExecutionContext,
	path: string[],
) => {
	switch (path[0]) {
		case "users":
			return userHandler(req, env, ctx, path);
		// case "resources":
		// 	await user(req, env, ctx);
		// 	return await resourceRoute(req, env, ctx, path);
		default:
			return json(req, { error: "api route not found" }, 404);
	}
};
