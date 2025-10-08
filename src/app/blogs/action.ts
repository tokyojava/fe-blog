"use server";

import { deleteBlog } from "@/model/blogs";
import { revalidatePath } from "next/cache";

export async function deleteBlogAction(formData: FormData) {
    const id = formData.get('id') as string;
    console.log("Deleting blog id:", id);
    await deleteBlog(id);
    revalidatePath('/blogs');
}