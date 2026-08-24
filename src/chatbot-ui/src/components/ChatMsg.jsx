import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessage = ({ role, content }) => {
    return (
        <div
            className={`mb-4 flex ${
                role === "user"
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 break-words ${
                    role === "user"
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-700 text-white"
                } ${content === "Thinking" ? "thinking-dots" : null}`}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatMessage;