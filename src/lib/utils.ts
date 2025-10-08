import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as jose from "jose";
import { JWT_SECRET, TOKEN_VALIDATION_INTERVAL } from "@/const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFormData(data: Record<string, string>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  return formData;
}

export function fromFormData(formData: FormData): Record<string, string> {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });
  return data;
}

export async function signToken(payload: any) {
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