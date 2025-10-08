import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './markdown.css';

export default function Markdown({ content, className }: { content: string, className?: string }) {
    return (
        <div className={`markdown ${className} border-2 border-gray-200 rounded-md p-4 bg-white`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>

    );
}