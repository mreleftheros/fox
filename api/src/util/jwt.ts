import * as jose from "jose";
import { EXPIRES_SECONDS } from "./shared";

export namespace Jwt {
	export const sign = async <T extends Partial<User>>(
		jwtSecret: string,
		userParams: T,
	) => {
		const secretBuf = new TextEncoder().encode(jwtSecret);

		return await new jose.SignJWT({
			id: userParams.id,
			accessLevel: userParams.accessLevel,
			isVerified: userParams.isVerified,
		})
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime(EXPIRES_SECONDS)
			.sign(secretBuf);
	};

	export const verify = async (
		jwtSecret: string,
		jwtToken: string,
	): Promise<jose.JWTVerifyResult<jose.JWTPayload>> => {
		const secretBuf = new TextEncoder().encode(jwtSecret);

		return await jose.jwtVerify(jwtToken, secretBuf);
	};
}
