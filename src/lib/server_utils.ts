import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserFromToken } from "./token";

export function handleErrorResponse(e: unknown) {
  console.error(e);
  return NextResponse.json({ error: e }, { status: 500 });
}

export function serverError(e: unknown) {
  if (e instanceof Error) {
    console.log(e.stack)
  }
  console.error(e);
}

export async function fetchUser() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token) {
    return null;
  } else {
    try {
      const user = await getUserFromToken(token);
      return user;
    } catch (e) {
      serverError("Failed to verify token:", e);
      return null;
    }
  }
}