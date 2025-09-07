import { parse, serialize } from "cookie";
import { EXPIRES_SECONDS } from "./shared";

export namespace Cookie {
	export const NAME_ACCESS_TOKEN = "access-token";
	export const serializeHeader = (env: Env, name: string, val: string) => {
		return {
			"Set-Cookie": serialize(name, val, {
				maxAge: EXPIRES_SECONDS,
				secure: true,
				httpOnly: true,
				sameSite: env.ENV === "production" ? "none" : "lax",
				path: "/",
			}),
		};
	};

	export const parseHeader = (name: string) => {
		return parse(name);
	};
}
