import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import sanitize from "rehype-sanitize";
import './markdown.css';
import { cn } from "@/lib/utils";

export default function Markdown({ content, className }: { content: string, className?: string }) {
    return (
        <div className={cn(`markdown border-2 border-gray-100 rounded-md bg-white ${className}`)}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw, sanitize]}
                remarkPlugins={[remarkGfm]}
            >
                {content}
            </ReactMarkdown>
        </div>

    );
}