import { handleApi } from "@/lib/api";
import { removeAllBlogs } from "@/model/blogs";
import { removeAllUsers } from "@/model/users";

export async function DELETE() {
    return handleApi({
        handler: async () => {
            await removeAllBlogs();
            await removeAllUsers();
        },
        skipUserValidation: true,
    });
}