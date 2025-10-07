import { clsx, type ClassValue } from "clsx"
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleErrorResponse(e: unknown) {
  console.error(e);
  return NextResponse.json({ error: e }, { status: 500 });
}