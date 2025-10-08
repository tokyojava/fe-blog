import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './markdown.css';
import { cn } from "@/lib/utils";

export default function Markdown({ content, className }: { content: string, className?: string }) {
    return (
        <div className={cn(`markdown border-2 border-gray-100 rounded-md bg-white ${className}`)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>

    );
}