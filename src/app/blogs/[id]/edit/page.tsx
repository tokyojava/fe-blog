import { CreateOrEditBlog } from "@/components/business/create_or_edit_blog";
import { connectToDatabase } from "@/db/driver";
import { getBlogById } from "@/model/blogs";
import { notFound } from "next/navigation";

export default async function EditBlogPage(props: PageProps<'/blogs/[id]/edit'>) {
    const { id } = await props.params;

    await connectToDatabase();
    const existingValues = await getBlogById(id);
    if (!existingValues) {
        // This will render the nearest `not-found.js` Error Boundary
        return notFound();
    }

    return <CreateOrEditBlog id={id} existingValues={existingValues} />;
}