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
                }`}
            >
                {content === "Thinking" ? (
                    <span className="thinking-dots">Thinking</span>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
                            ),

                            h2: ({ node, ...props }) => (
                                <h2 className="text-xl font-bold mt-4 mb-2" {...props} />
                            ),

                            h3: ({ node, ...props }) => (
                                <h3 className="text-lg font-bold mt-3 mb-2" {...props} />
                            ),

                            p: ({ node, ...props }) => (
                                <p className="mb-3" {...props} />
                            ),

                            ul: ({ node, ...props }) => (
                                <ul className="list-disc ml-5 mb-3" {...props} />
                            ),

                            ol: ({ node, ...props }) => (
                                <ol className="list-decimal ml-5 mb-3" {...props} />
                            ),

                            li: ({ node, ...props }) => (
                                <li className="mb-1" {...props} />
                            ),

                            table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-4">
                                    <table
                                        className="w-full border-collapse text-sm"
                                        {...props}
                                    />
                                </div>
                            ),

                            th: ({ node, ...props }) => (
                                <th
                                    className="border border-gray-500 bg-gray-800 px-3 py-2 text-left font-semibold"
                                    {...props}
                                />
                            ),

                            td: ({ node, ...props }) => (
                                <td
                                    className="border border-gray-600 px-3 py-2"
                                    {...props}
                                />
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;