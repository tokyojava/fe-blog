'use server'

import { API_ERRORS, APIException, handleActionApi } from "@/lib/api";
import { serverLog } from "@/lib/server_utils";
import { TokenPayload } from "@/lib/token";
import { createBlog } from "@/model/blogs";
import { CreateOrUpdateBlogRequest, CreateOrUpdateBlogZodSchema } from "@/types/blog";
import { revalidatePath } from "next/cache";

export async function CreateBlogAction(req: CreateOrUpdateBlogRequest) {
    return handleActionApi({
        handler: async (user: TokenPayload | null) => {
            const result = await CreateOrUpdateBlogZodSchema.safeParseAsync(req);

            if (result.success) {
                let blog = null;

                blog = await createBlog({
                    ...result.data,
                    author: user!.id,
                });
                serverLog("blog created", blog);

                revalidatePath('/blogs');
                return blog._id.toString();
            } else {
                throw new APIException(API_ERRORS.SERVER_SIDE_VALIDATION_ERROR);
            }
        },
        skipUserValidation: false,
    });
}