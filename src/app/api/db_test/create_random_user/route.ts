import { connectToDatabase } from "@/db/driver";
import { handleErrorResponse } from "@/lib/server_utils";
import { createEmailPasswordUser } from "@/model/users";
import { CreateEmailUserRequest } from "@/types/user"
import { NextResponse } from "next/server";

export async function POST() {
    const userName = "test-" + Date.now();
    const req: CreateEmailUserRequest = {
        username: userName,
        email: userName + "@test.com",
        password: userName,
    };

    try {
        await connectToDatabase();
        const user = await createEmailPasswordUser(req);
        return NextResponse.json(user);
    } catch (e: unknown) {
        return handleErrorResponse(e);
    }

}