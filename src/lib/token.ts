import * as jose from "jose";
import { JWT_SECRET, TOKEN_VALIDATION_INTERVAL } from "@/const";
export type TokenPayload = {
    id: string;
    email: string;
    name: string;
}

export async function signToken(payload: TokenPayload) {
    const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(TOKEN_VALIDATION_INTERVAL + "d") // 7天后过期
        .sign(JWT_SECRET);
    return token;
}

// ✅ 验证 token
export async function verifyToken(token: string) {
    try {
        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        return payload;
    } catch (err) {
        console.error("Invalid token", err);
        return null;
    }
}

export async function getUserFromToken(token: string) {
    const payload = await verifyToken(token);
    if (payload) {
        return payload as TokenPayload;
    }
    return null;
}