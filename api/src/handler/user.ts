import { User } from "../store/user";
import { Cookie } from "../util/cookie";
import ApiError from "../util/error";
import { Jwt } from "../util/jwt";
import { json } from "../util/response";

export default async (
	req: Request,
	env: Env,
	ctx: ExecutionContext,
	path: string[],
) => {
	if (path[1]) {
		if (path[1] === "signup" && req.method === "POST") {
			// /users/signup
			const us: UserSignup = await req.json();
			const { error, data, errors } = User.validateSignup(us);
			if (error) {
				return json(req, { error, errors }, 400);
			}

			const u = await User.set(env, data as UserSignup);
			const jwtToken = await Jwt.sign(env.JWT, {
				id: u.id,
				accessLevel: u.accessLevel,
			});

			return json(
				req,
				{ data: u },
				201,
				Cookie.serializeHeader(env, Cookie.NAME_ACCESS_TOKEN, jwtToken),
			);
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
