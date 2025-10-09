import { handleActionApi } from "@/lib/api";
import { listTestUsers, removeTestUsers } from "@/model/users";

export async function GET() {
    return handleActionApi({
        handler: async () => {
            const user = await listTestUsers();
            return user;
        },
        skipUserValidation: false,
    });
}

export async function DELETE() {
    return handleActionApi({
        handler: async () => {
            await removeTestUsers();
        },
        skipUserValidation: false,
    });
}