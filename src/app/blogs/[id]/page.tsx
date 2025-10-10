
import { BackToList } from "@/components/business/back_to_list";
import BlogCategoryTypeInfo from "@/components/business/blog_category_type_info";
import { DeleteBlogButton } from "@/components/business/delete_blog_button";
import Markdown from "@/components/business/markdown";
import { EditBlogButton } from "@/components/business/update_blog_button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectToDatabase } from "@/db/driver";
import { formatReadableTime, sleep } from "@/lib/utils";
import { getBlogById } from "@/model/blogs";
import { notFound } from "next/navigation";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectToDatabase();
    const blog = await getBlogById(id);
    if (!blog) {
        // This will render the nearest `not-found.js` Error Boundary
        return notFound();
    }

    return (
        <div className="w-full h-full p-6">
            <BackToList />
            <Card className="w-full border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
                    <div className="w-full flex align-center justify-between">
                        <BlogCategoryTypeInfo blog={blog} />
                        <div className="flex align-center space-x-4">
                            <span className="text-blue-500">By {blog.author.username}</span>
                            <span className="text-gray-500">{formatReadableTime(blog.updated_at)}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Markdown className="border-0" content={blog.content} />
                    <div className="flex items-center space-x-4 mt-6">
                        <EditBlogButton blogId={blog._id.toString()} />
                        <DeleteBlogButton blogId={blog._id.toString()} redirectToBlogPage />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}