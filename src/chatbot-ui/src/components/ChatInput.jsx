import { UploadDocument } from "../api/chat.jsx";

export default function ChatInput({input, setInput, sendMessage, addUploadMsg, addMsg}) {
    return(
        <form className='flex mt-8 w-full max-w-lg bg-gray-600 text-white rounded-full h-14 items-center' onSubmit={sendMessage}>
            <UploadDocument addUploadMsg={addUploadMsg} addMsg={addMsg}/>
            <input 
                className='flex-1 mx-8 outline-none'
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button className="mx-4 cursor-pointer" type="submit">
                Send
            </button>
        </form>
    );
}