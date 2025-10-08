
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackToList } from "@/components/business/back_to_list";
import { getBlogById } from "@/model/blogs";
import { notFound } from "next/navigation";
import { formatReadableTime } from "@/lib/utils";
import { connectToDatabase } from "@/db/driver";
import Markdown from "@/components/business/markdown";
import { NotebookText, Rss } from "lucide-react";

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
                        <div className="flex align-center space-x-4">
                            <Badge variant="default">{blog.category}</Badge>
                            <span className="flex items-center space-x-2">
                                {blog.category === "Blog" ? (
                                    <>
                                        <Rss /> <span className="ml-[-4px]">Blog</span>
                                    </>
                                ) : (
                                    <>
                                        <NotebookText /> <span className="ml-[-4px]">Diary</span>
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="flex align-center space-x-4">
                            <span className="text-blue-500">By {blog.author.username}</span>
                            <span className="text-gray-500">{formatReadableTime(blog.updated_at)}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Markdown className="border-0" content={blog.content} />
                    <div className="flex items-center space-x-4 mt-6">
                        <Button variant="secondary">Promote</Button>
                        <Button variant="outline">Edit</Button>
                        <Button variant="destructive">Delete</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}