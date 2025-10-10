import { formatReadableTime } from "@/lib/utils";
import { PopulatedBlog } from "@/model/blogs";
import { Card, CardHeader, CardContent } from "../ui/card";
import BlogCategoryTypeInfo from "./blog_category_type_info";
import { DeleteBlogButton } from "./delete_blog_button";
import { EditBlogButton } from "./update_blog_button";
import { Button } from "../ui/button";
import Link from "next/link";

export function BlogCard({ blog, isEditable }: { blog: PopulatedBlog, isEditable?: boolean }) {
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <span>{blog.author.username}</span>
                        <span>•</span>
                        <span>{formatReadableTime(blog.updated_at)}</span>
                    </div>
                </div>
                <BlogCategoryTypeInfo blog={blog} />
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex space-x-2">
                    <Button asChild variant="outline">
                        <Link href={`/blogs/${blog._id}`}>
                            View
                        </Link>
                    </Button>
                    {isEditable && <EditBlogButton blogId={blog._id.toString()} />}
                </div>
                {isEditable && <DeleteBlogButton blogId={blog._id.toString()} />}
            </CardContent>
        </Card>
    )
}