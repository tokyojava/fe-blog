import { handleApi } from "@/lib/api";
import { fetchUser } from "@/lib/server_utils";

export async function GET() {
    return handleApi({
        handler: async () => {
            const user = await fetchUser();
            return user;
        },
        skipUserValidation: true,
    })

}