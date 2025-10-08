import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { techGroups } from "@/const";
import { getMyBlogs, type PopulatedBlog } from "@/model/blogs";
import { formatReadableTime } from "@/lib/utils";
import { connectToDatabase } from "@/db/driver";
import CreateBlogButton from "@/components/business/create_new_blog";
import { fetchUser } from "@/lib/server_utils";
import { redirect } from "next/navigation";
import { SingleSelect } from "@/components/business/single-select";
import Link from "next/link";
import { deleteBlogAction } from "./action";

export default async function BlogsPage() {
    await connectToDatabase();
    const me = await fetchUser();
    if (!me) {
        redirect("/login");
    }
    const blogs = await getMyBlogs(me.id);

    return (
        <div className="p-6">
            <CreateBlogButton />

            {/* Filters Section */}
            <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
                <div className="flex items-center mb-4">
                    <span className="flex items-center text-gray-600 text-sm font-medium">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 mb-2">Type</span>
                        <Select>
                            <SelectTrigger>
                                <SelectValue className="text-black" placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="blog">Blog</SelectItem>
                                <SelectItem value="diary">Diary</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 mb-2">Category</span>
                        <SingleSelect
                            groups={techGroups}
                            placeholder="All"
                        />
                    </div>
                </div>
            </div>

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
    );
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
                <div className="flex items-center space-x-2">
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">Mine</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div className="flex space-x-2">
                    <Button asChild variant="outline">
                        <Link href={`/blogs/${blog._id}`}>
                            View
                        </Link>
                    </Button>
                    <Button variant="outline">Edit</Button>
                    <Button variant="secondary">Promote</Button>
                </div>
                <form action={deleteBlogAction}>
                    <input type="hidden" name="id" value={blog._id.toString()} />
                    <Button className="cursor-pointer" type='submit' variant="destructive">Delete</Button>
                </form>
            </CardContent>
        </Card>
    )
}