'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteBlog } from "@/model/blogs";
import { revalidatePath } from "next/cache";
import { handleApi } from "@/lib/api";

export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/login');
}

export const deleteBlogAction = async (blogId: string, redirectToBlogPage: boolean) => {
    return handleApi({
        handler: async () => {
            await deleteBlog(blogId);
            revalidatePath('/blogs');
            revalidatePath('/dashboard');
        },
        isServerAction: true,
        skipUserValidation: false
    })
};