import { TokenPayload } from "@/lib/token"
import { getBlogs } from "@/model/blogs"
import { BlogCard } from "./blog_card"
import { BlogPagePagination } from "./blog_page_pagination"
import { withUser } from "./with_user"

interface BlogsPageMainComponentProps {
    user: TokenPayload;
    params: { [key: string]: string | string[] | undefined };
}

async function BlogsPageMainComponent(props: BlogsPageMainComponentProps) {
    const { user, params } = props;
    const { blogs, pagination } = await getBlogs({ author: user.id, ...params });
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
            {blogs.length === 0 && (
                <div className="text-center text-gray-500 col-span-full">
                    No blogs found. Click &apos;New Blog&apos; to create your first blog!
                </div>)
            }
            <div className="flex justify-end mt-6 col-span-full">
                <BlogPagePagination totalPages={pagination.totalPages} initialPage={params.page as string || "1"} />
            </div>
        </div>
    );
}

export default withUser(BlogsPageMainComponent);
