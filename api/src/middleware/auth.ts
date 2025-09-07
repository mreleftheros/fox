import type { JWTVerifyResult } from "jose";
import { Cookie } from "../util/cookie";
import ApiError from "../util/error";
import { Jwt } from "../util/jwt";

export const accessLevel = (
	req: Request,
	env: Env,
	ctx: ExecutionContext,
	accessLevel: User["accessLevel"],
	min: User["accessLevel"],
) => {
	auth(req, env, ctx);
	isVerified(req, env, ctx);
	if (accessLevel > min) {
		throw new ApiError("invalid access level", 403);
	}
};

export const isVerified = (req: Request, env: Env, ctx: ExecutionContext) => {
	auth(req, env, ctx);
	if (!ctx.jwtClaims?.isVerified) {
		throw new ApiError("not verified user", 401);
	}
};

export const auth = async (req: Request, env: Env, ctx: ExecutionContext) => {
	const cookies = req.headers.get("Cookie");
	if (!cookies) {
		throw new ApiError("cookies not found", 401);
	}

	const jwtToken = Cookie.parseHeader(cookies)[Cookie.NAME_ACCESS_TOKEN];
	if (!jwtToken) {
		throw new ApiError("access token not found", 401);
	}

	let decoded: JWTVerifyResult;
	try {
		decoded = await Jwt.verify(env.JWT, jwtToken);
	} catch (_) {
		throw new ApiError("invalid auth token", 401);
	}

	ctx.jwtClaims = decoded.payload as JwtClaims;
};
