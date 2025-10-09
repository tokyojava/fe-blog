import { NotebookText, Rss } from "lucide-react";
import { Badge } from "../ui/badge";
import { IBlog } from "@/model/blogs";

export default function BlogCategoryTypeInfo({ blog }: { blog: IBlog }) {
    return (
        <div className="flex align-center">
            <span className="flex items-center space-x-">
                {blog.type === "blog" ? (
                    <>
                        <Rss className="w-4 h-4" /> <span>Blog</span>
                    </>
                ) : (
                    <>
                        <NotebookText className="w-4 h-4" /> <span>Diary</span>
                    </>
                )}
                <div className="flex items-center space-x-1 ml-6">
                    {
                        blog.category.map((cat) => (
                            <Badge key={cat} variant="secondary">{cat}</Badge>
                        ))
                    }
                </div>
            </span>
        </div>
    )
}