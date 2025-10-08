import { getBlogById } from "@/model/blogs";
import { notFound } from "next/navigation";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id);
    console.log(blog);
    if (!blog) {
        return notFound();
    }

    return (
        <div>
            <h1>Blog Page - {id}</h1>
            {blog.title}
            {blog.content}
        </div>
    );
}