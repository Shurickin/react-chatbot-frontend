import ChatMessage from "./ChatMsg";

const ChatMessages = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto p-6 max-h-285">
            <div className="mx-auto max-w-6xl">
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        role={msg.role}
                        content={msg.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatMessages;