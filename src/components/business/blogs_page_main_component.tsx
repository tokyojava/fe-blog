import { formatReadableTime, sleep } from "@/lib/utils"
import { getBlogs, PopulatedBlog } from "@/model/blogs"
import { Card, CardHeader, CardContent } from "../ui/card"
import BlogCategoryTypeInfo from "./blog_category_type_info"
import { BlogPagePagination } from "./blog_page_pagination"
import { DeleteBlogButton } from "./delete_blog_button"
import { Button } from "../ui/button"
import { withUser } from "./with_user"
import { TokenPayload } from "@/lib/token"
import Link from "next/link"
import { EditBlogButton } from "./update_blog_button"

interface BlogsPageMainComponentProps {
    user: TokenPayload;
    params: { [key: string]: string | string[] | undefined };
}

async function BlogsPageMainComponent(props: BlogsPageMainComponentProps) {
    const { user, params } = props;
    await sleep(500); // Simulate a delay for demonstration purposes
    const { blogs, pagination } = await getBlogs({ author: user.id, ...params });
    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
            {blogs.length === 0 && (
                <div className="text-center text-gray-500">
                    No blogs found. Click &apos;New Blog&apos; to create your first blog!
                </div>)
            }
            <div className="flex justify-end mt-6">
                <BlogPagePagination totalPages={pagination.totalPages} initialPage={params.page as string || "1"} />
            </div>
        </div>
    );
}

export default withUser(BlogsPageMainComponent);


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
                    <EditBlogButton blogId={blog._id.toString()} />
                </div>
                <DeleteBlogButton
                    blogId={blog._id.toString()}
                />
            </CardContent>
        </Card>
    )
}