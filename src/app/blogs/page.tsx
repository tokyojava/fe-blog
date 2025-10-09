import BlogCategoryTypeInfo from "@/components/business/blog_category_type_info";
import { BlogsFiltersSection } from "@/components/business/blogs_filters_section";
import CreateBlogButton from "@/components/business/create_new_blog";
import { DeleteBlogButton } from "@/components/business/delete_blog_button";
import { withUser } from "@/components/business/with_user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type TokenPayload } from "@/lib/token";
import { formatReadableTime } from "@/lib/utils";
import { getBlogs, type IBlog, type PopulatedBlog } from "@/model/blogs";
import Link from "next/link";

export default withUser(BlogsPage);

interface BlogPageProps {
    user: TokenPayload;
    searchParams: {
        category?: string[];
        type?: IBlog['type'];
    };
}

async function BlogsPage(props: BlogPageProps) {
    const { user, searchParams } = props;

    const params = await searchParams;
    const blogs = await getBlogs({ author: user.id, ...params });
    return (
        <div className="p-6">
            <CreateBlogButton />
            {/* Filters Section */}
            <BlogsFiltersSection />

            {/* Problems List */}
            <div className="space-y-4">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
                {blogs.length === 0 && (
                    <div className="text-center text-gray-500">
                        No blogs found. Click &apos;New Blog&apos; to create your first blog!
                    </div>)
                }
            </div>
        </div>
    )
}

function BlogCard({ blog }: { blog: PopulatedBlog }) {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <span>{blog.author.username} </span>
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
                    <Button variant="outline">Edit</Button>
                </div>
                <DeleteBlogButton
                    blogId={blog._id.toString()}
                />
            </CardContent>
        </Card>
    )
}