import { isVerified } from "../middleware/auth";
import { User } from "../store/user";
import { Cookie } from "../util/cookie";
import ApiError from "../util/error";
import { Jwt } from "../util/jwt";
import { Password } from "../util/password";
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
			const body = await req.json<UserSignup>();
			const { error, data: us, errors } = User.validateSignup(body);
			if (error) {
				return json(req, { error, errors }, 400);
			}

			const u = await User.set(env, us as UserSignup);
			const jwtToken = await Jwt.sign(env.JWT, {
				id: u.id,
				accessLevel: u.accessLevel,
				isVerified: u.isVerified,
			});

			return json(
				req,
				{ data: u },
				201,
				Cookie.serializeHeader(env, Cookie.NAME_ACCESS_TOKEN, jwtToken),
			);
		} else if (path[1] === "login" && req.method === "POST") {
			// /users/login
			const body = await req.json<UserLogin>();

			const ud = await User.getByUsername(env, body.username);
			if (!ud) {
				return json(req, { error: "invalid credentials" }, 400);
			}
			const result = await Password.verify(body.password, env.SALT, ud.hash);
			if (!result) {
				return json(req, { error: "invalid credentials" }, 400);
			}

			const jwtToken = await Jwt.sign(env.JWT, {
				id: ud.id,
				accessLevel: ud.accessLevel,
				isVerified: ud.isVerified,
			});

			// biome-ignore lint/correctness/noUnusedVariables: requires double _
			const { hash, createdOn, ...u } = ud;

			return json(
				req,
				{ data: u },
				200,
				Cookie.serializeHeader(env, Cookie.NAME_ACCESS_TOKEN, jwtToken),
			);
		} else if (path[1] === "logout" && req.method === "POST") {
			// /users/logout
			return json(
				req,
				null,
				204,
				Cookie.serializeHeader(env, Cookie.NAME_ACCESS_TOKEN, ""),
			);
		} else if (path[1] === "current" && req.method === "GET") {
			// /users/current
			isVerified(req, env, ctx);
			if (!ctx.jwtClaims) {
				throw new ApiError();
			}
			const u = await User.get(env, ctx.jwtClaims?.id);
			if (!u) {
				throw new ApiError("user not found", 401);
			}
			return json(req, { data: u }, 200);
		} else {
			throw new ApiError(`${req.method} ${path.join("/")} invalid`);
		}
	}
};
