
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackToList } from "@/components/business/back_to_list";
import { getBlogById } from "@/model/blogs";
import { notFound } from "next/navigation";
import { formatReadableTime } from "@/lib/utils";

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const blog = await getBlogById(id);
    if (!blog) {
        // This will render the nearest `not-found.js` Error Boundary
        return notFound();
    }

    return (
        <div className="w-full h-full p-6">
            <BackToList />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{blog.category}</Badge>
                        <span className="text-gray-500">{formatReadableTime(blog.updated_at)}</span>
                    </div>
                    <div className="text-gray-500 mt-2">By John Doe</div>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-semibold mt-4">Array Index Error</h2>
                    <p className="text-gray-700 mt-2">
                        Always check array length before accessing elements:
                    </p>
                    <pre className="bg-gray-100 p-4 rounded mt-4">
                        <code>
                            {`if (arr.length > index) {\n    return arr[index];\n}`}
                        </code>
                    </pre>
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