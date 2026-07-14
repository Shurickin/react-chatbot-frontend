import { UploadDocument } from "../api/chat.jsx";
import { useRef } from "react";

export default function ChatInput({input, setInput, sendMessage, addUploadMsg, addMsg, sessionId}) {
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);

        const textarea = textareaRef.current;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleKeyDown = (e) => {
        // Check if Enter was pressed without the Shift key
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Stop a new line from being added
            sendMessage(e);     // Call your existing submit function
        }
    };

    return(
        <form className='flex mt-8 w-full max-w-lg bg-gray-600 text-white rounded-3xl min-h-14 items-end pb-3' onSubmit={sendMessage}>
            {/* Note: changed items-center to items-end so buttons stay at the bottom when text grows */}
            <UploadDocument addUploadMsg={addUploadMsg} addMsg={addMsg} sessionId={sessionId}/>
            
            <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Message..."
                className="
                    field-sizing-content
                    w-full
                    resize-none
                    overflow-y-auto
                    bg-gray-600
                    text-white
                    pt-2
                    px-2
                    outline-none
                    max-h-52
                "
            />

            <button className="mx-4 mb-1 cursor-pointer" type="submit">
                Send
            </button>
        </form>
        // <form className='flex mt-8 w-full max-w-lg bg-gray-600 text-white rounded-full min-h-14 items-center' onSubmit={sendMessage}>
        //     <UploadDocument addUploadMsg={addUploadMsg} addMsg={addMsg} sessionId={sessionId}/>
        //     {/* <input 
        //         className='flex-1 mx-8 outline-none'
        //         type="text"
        //         placeholder="Ask me anything..."
        //         value={input}
        //         onChange={(e) => setInput(e.target.value)}
        //     /> */}
        //     <textarea
        //         ref={textareaRef}
        //         value={input}
        //         onChange={handleInputChange}
        //         placeholder="Message..."
        //         className="
        //             field-sizing-content
        //             w-full
        //             resize-none
        //             overflow-y-auto
        //             rounded-xl
        //             bg-gray-600
        //             text-white
        //             p-4
        //             outline-none
        //             max-h-52
        //         "
        //     />

        //     <button className="mx-4 cursor-pointer" type="submit">
        //         Send
        //     </button>
        // </form>
    );
}