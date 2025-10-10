import { connectToDatabase } from "@/db/driver"
import { getBlogs } from "@/model/blogs"
import { BlogCard } from "./blog_card"
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
