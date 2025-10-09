import { cookies } from "next/headers";
import { getUserFromToken } from "./token";
import { connectToDatabase } from "@/db/driver";

export function serverLog(...args: any[]) {
  console.log(...args);
}

export function serverError(e: unknown) {
  if (e instanceof Error) {
    console.error(e.stack)
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
      await connectToDatabase();
      const user = await getUserFromToken(token);
      return user;
    } catch (e: any) {
      serverError("Failed to verify token:" + e.message);
      return null;
    }
  }
}