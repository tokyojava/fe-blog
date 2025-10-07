import { NextResponse } from "next/server";

export function handleErrorResponse(e: unknown) {
  console.error(e);
  return NextResponse.json({ error: e }, { status: 500 });
}

export function serverError(e: unknown) {
  console.error(e);
}