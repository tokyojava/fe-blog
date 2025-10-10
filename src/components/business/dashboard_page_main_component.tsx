import { connectToDatabase } from "@/db/driver"
import { formatReadableTime } from "@/lib/utils"
import { getBlogs, PopulatedBlog } from "@/model/blogs"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import BlogCategoryTypeInfo from "./blog_category_type_info"
import { BlogPagePagination } from "./blog_page_pagination"

interface DashboardPageMainComponentProps {
    params: { [key: string]: string | string[] | undefined };
}

export default async function BlogsPageMainComponent(props: DashboardPageMainComponentProps) {
    const { params } = props;
    await connectToDatabase();
    const { blogs, pagination } = await getBlogs({ ...params });
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
            {blogs.length === 0 && (
                <div className="text-center text-gray-500 col-span-full">
                    No blogs found for the current search criteria.
                </div>)
            }
            <div className="flex justify-end mt-6 col-span-full">
                <BlogPagePagination totalPages={pagination.totalPages} initialPage={params.page as string || "1"} />
            </div>
        </div>
    );
}

function BlogCard({ blog }: { blog: PopulatedBlog }) {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
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
            <CardContent className="flex items-center justify-between">
                <div className="flex space-x-2">
                    <Button asChild variant="outline">
                        <Link href={`/blogs/${blog._id}`}>
                            View
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}