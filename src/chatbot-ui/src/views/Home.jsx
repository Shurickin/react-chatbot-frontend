import { useState } from "react";

import { askQuestion } from "../api/chat";

import Sidebar from '../components/Sidebar'
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMsgs";
import dropdown from "../assets/dropdown.png";

function Home() {
    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        const question = input;

        setInput("");

        // Add user message
        setMessages(prev => [
            ...prev,
            {
                role: "user",
                content: question
            }
        ]);

        // Add empty assistant message
        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                content: ""
            }
        ]);


        await askQuestion(
            "test-session",
            question,
            (chunk) => {
                setMessages(prev => {
                    return prev.map((msg, index) => {
                        if (index === prev.length - 1) {
                            return {
                                ...msg,
                                content: msg.content + chunk
                            };
                        }

                        return msg;
                    });
                });
            }
        );
    };

    // This was for an entire message post-fastapi connection
    // const sendMessage = async (e) => {
    //     e.preventDefault();

    //     const question = input;

    //     setMessages(prev => [
    //         ...prev,
    //         {
    //             role: "user",
    //             content: question
    //         }
    //     ]);

    //     setInput("");

    //     const response = await askQuestion("test-session", question);

    //     console.log(response);

    //     setMessages(prev => [
    //         ...prev,
    //         {
    //             role: "assistant",
    //             content: response.content
    //         }
    //     ]);
    // };

    // This was for an entire message pre-fastapi connection
    // const sendMessage = (e) => {
    //     e.preventDefault();

    //     setMessages(prev => [
    //         ...prev,
    //         {
    //             role: "user",
    //             content: input
    //         },
    //         {
    //             role: "assistant",
    //             content: "Assistant: " + input
    //         }
    //     ]);

    //     // setMessages([
    //     //     ...messages,
    //     //     {
    //     //         role: "user",
    //     //         content: input
    //     //     },
    //     //     {
    //     //         role: "assistant",
    //     //         content: "Assitant: " + input
    //     //     }
    //     // ]);

    //     setInput("");
    // };

    return (
        <main className="flex min-h-screen bg-black">
            <Sidebar />
            <section className="flex-1 flex flex-col min-h-0">
                <button className="flex text-white hover:bg-gray-800 transition-colors max-w-32 justify-center items-center gap-2 rounded-2xl text-2xl ml-8">
                    Llama3
                    <img className="w-4 h-4" src={dropdown}></img>
                </button>
                {/* Messages area */}
                <div className="flex-1">
                    {messages.length === 0 ? (
                        <div className="h-full flex items-end justify-center">
                            <h1 className="text-4xl font-bold text-white">
                                How can I help?
                            </h1>
                        </div>
                    ) : (
                        <ChatMessages messages={messages} />
                        // <div className="flex-1 flex overflow-y-auto space-y-1 justify-end mr-12">
                        //     {messages.map((msg) => (
                        //         <p
                        //             className=" w-20 p-4 text-white rounded-full bg-gray-600 group flex flex-col"
                        //         >
                        //             {msg.content}
                        //         </p>
                        //     ))}
                        // </div>
                    )}
                </div>


                {/* Input area */}
                {messages.length === 0 ? (
                    <div className="flex-1 flex justify-center">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            sendMessage={sendMessage}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center pb-8">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            sendMessage={sendMessage}
                        />
                    </div>
                )}
                
                

            </section>

            {/* {messages.length === 0 ? (
                <section className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">
                        How can I help?
                    </h1>
                    <form className='flex mt-8 w-full max-w-lg bg-gray-600 text-white rounded-full h-14' onSubmit={sendMessage}>
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
                </section>
            ) : (
                <div>Chat Started</div>
            ) } */}
            

        </main>
    );
}

export default Home;