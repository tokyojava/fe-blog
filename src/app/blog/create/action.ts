'use server'

import { fromFormData } from "@/lib/utils";
import { CreatePostZodSchema } from "@/types/post";

export type CreatePostActionServerSideState = {
    apiError?: string;
}

export async function CreatePostAction(prevState: CreatePostActionServerSideState, formData: FormData) {
    // 这里可以处理表单数据，例如保存到数据库
    const obj = fromFormData(formData);
    const result = await CreatePostZodSchema.safeParseAsync(obj);

    if (result.success) {
        console.log(result.data);
    } else {
        return {
            apiError: "Invalid input data, this should not happen"
        };
    }
    return { success: true };
}