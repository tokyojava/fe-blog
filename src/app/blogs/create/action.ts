'use server'

import { connectToDatabase } from "@/db/driver";
import { fetchUser, serverError } from "@/lib/server_utils";
import { fromFormData } from "@/lib/utils";
import { createBlog } from "@/model/blogs";
import { CreateBlogRequest, CreateBlogZodSchema } from "@/types/blog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateBlogActionServerSideState = {
    apiError?: string;
}

export async function CreateBlogAction(prevState: CreateBlogActionServerSideState, formData: FormData) {
    // 这里可以处理表单数据，例如保存到数据库
    const obj = fromFormData(formData) as CreateBlogRequest;
    const result = await CreateBlogZodSchema.safeParseAsync(obj);

    const user = await fetchUser();
    if (!user) {
        // TODO: bug
        redirect('/login');
    }

    if (result.success) {
        let blog = null;
        try {
            await connectToDatabase();

            console.log(obj);            
            blog = await createBlog({
                ...obj,
                author: user.id,
            });

        } catch (e: unknown) {
            serverError(e);
            return {
                apiError: "Internal server error"
            };
        }
        revalidatePath('/blogs');
        redirect('/blogs/' + blog._id);
    } else {
        return {
            apiError: "Invalid input data, this should not happen"
        };
    }
    return { success: true };
}