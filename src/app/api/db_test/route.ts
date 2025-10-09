import { handleActionApi } from "@/lib/api";
import User from "@/model/users";

export async function GET() {
    return handleActionApi({
        handler: async () => {
            const usersCount = await User.countDocuments();
            return { message: `Database test Successful and there are ${usersCount} users in the system` };
        },
        skipUserValidation: true,
    })

}