import { connectToDatabase } from "@/db/driver";
import { handleErrorResponse } from "@/lib/server_utils";
import { listTestUsers, removeTestUsers } from "@/model/users";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const user = await listTestUsers();
        return NextResponse.json(user);
    } catch (e: unknown) {
        return handleErrorResponse(e);
    }
}

export async function DELETE() {
    try {
        await connectToDatabase();
        await removeTestUsers();
        return NextResponse.json({});
    } catch (e: unknown) {
        return handleErrorResponse(e);
    }
}