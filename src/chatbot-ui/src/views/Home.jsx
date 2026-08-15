import { useState, useEffect, use } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

import { askQuestion, UploadDocument, loadConversations, loadConversation, newChat, deleteConvo } from "../api/chat.jsx";

import Sidebar from '../components/Sidebar'
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMsgs";
import dropdown from "../assets/dropdown.png";
import {settingsSidebar} from '../components/ChatData';

// Put these smaller components above your main Home component
const GeneralPanel = () => (
    <div className="space-y-4">
        <p>Manage your account preferences and application language here.</p>
    </div>
);

const SecurityPanel = () => (
    <div className="space-y-4">
        <p>Update your password, two-factor authentication, and API access keys.</p>
    </div>
);

const handleLogOut = async () => {
    try {
      // This tells Firebase to delete the session token from local storage
      await signOut(auth);
      console.log("User successfully signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
};

const AccountPanel = () => (
    <button 
            onClick={handleLogOut} 
            style={{ padding: '8px 12px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
        Log Out
    </button>
);

const panelContent = {
    'General': <GeneralPanel />,
    'Security & Privacy': <SecurityPanel />,
    'Account': <AccountPanel />,
};

// const userID = "12";


function Home(user) {
    const userID = user.user.uid; 

    // console.log(userID);

    const [messages, setMessages] = useState([]);

    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);

    const [input, setInput] = useState("");

    const [deleteModal, setDeleteModal] = useState(""); // Starts hidden

    const [activeTab, setActiveTab] = useState(""); // Starts hidden

    const sendMessage = async (e) => {
        e.preventDefault();

        let conversation = currentConversation;

        if (!conversation) {
            conversation = await newChat(userID, setCurrentConversation, setMessages, true);
        }

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
                content: "Thinking"
            }
        ]);

        //console.log(conversation)
        //console.log(messages.length)

        const isFirstMessage = messages.length === 0;

        await askQuestion(
            conversation,
            question,
            (chunk) => {
                setMessages(prev => {
                    return prev.map((msg, index) => {
                        if (index === prev.length - 1) {
                            return {
                                ...msg,
                                content: msg.content === "Thinking" ? chunk : msg.content + chunk
                            };
                        }

                        return msg;
                    });
                });
            }
        );

        if (isFirstMessage) {
            console.log("We are loading the new Convo!")
            await loadConversations(userID, setConversations);
        }
    };

    const addUploadMsg = (text) => {
        setMessages(prev => {
            const updated = [...prev];

            const lastMsg = updated[updated.length - 1];

            updated[updated.length - 1] = {
                ...lastMsg,
                content: text
            };
            // `✓ ${file.name} uploaded successfully.`

            return updated;
        });
    }

    const addMsg = (role, text) => {
        setMessages(prev => [
            ...prev,
            {
                role: role,
                content: text
            }
        ]);
    }

    useEffect(() => {
        loadConversations(userID, setConversations);
    }, []);

    // const handleConversationClick = async (id) => {
    //     setCurrentConversation(id);
    //     await loadConversation(id, setMessages);
    // };

    // useEffect(() => {
    //     loadConversation(currentConversation, setMessages);
    // }, [currentConversation]);


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
            {/* Modal Overlay - Only opens if activeTab is not an empty string */}
            {activeTab !== '' && (
                <div 
                    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center overflow-y-auto"
                    onClick={() => setActiveTab('')} // Closes modal on backdrop click
                >
                    {/* Settings Layout Box (Slightly wider for multi-tab settings) */}
                    <div 
                        className="relative flex bg-neutral-900 border border-neutral-800 text-white w-full max-w-2xl min-h-[400px] m-4 rounded-xl shadow-2xl overflow-hidden" 
                        onClick={(e) => e.stopPropagation()} 
                    >
                        
                        {/* Modal Internal Settings Sidebar */}
                        <div className="w-1/3 bg-neutral-950 p-4 border-r border-neutral-800 flex flex-col gap-2">
                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-2 mb-2">Settings</p>
                            {settingsSidebar.map((chat) => (
                                 <button
                                    key={chat.id}
                                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === chat.title ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
                                    onClick={() => setActiveTab(chat.title)} 
                                 >
                                    <span className="truncate text-sm font-medium w-full">
                                    {chat.title}
                                    </span>
                                 </button>
                            ))}
                            {/* <button 
                                onClick={() => setActiveTab('General')} 
                                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'General' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
                            >
                                General
                            </button>
                            <button 
                                onClick={() => setActiveTab('Security & Privacy')} 
                                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === 'Security & Privacy' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:bg-neutral-800'}`}
                            >
                                Security
                            </button> */}
                        </div>

                        {/* Modal Content Panel */}
                        <div className="flex-1 p-6 flex flex-col">
                            <h2 className="text-xl font-semibold mb-6 text-white">{activeTab}</h2>
                            
                            <div className="flex-1 text-sm text-neutral-300">
                                {panelContent[activeTab] || <div>Tab not found</div>}
                            </div>
                        </div>

                        {/* Close Icon Button */}
                        <button 
                            onClick={() => setActiveTab('')} 
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Overlay - Only opens if activeTab is not an empty string */}
            {deleteModal && (
                <div 
                    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center overflow-y-auto"
                    onClick={() => setDeleteModal("")} // Closes modal on backdrop click
                >
                    {/* Settings Layout Box (Slightly wider for multi-tab settings) */}
                    <div 
                        className="relative flex bg-neutral-900 border border-neutral-800 text-white w-full max-w-2xl m-4 rounded-xl shadow-2xl overflow-hidden" 
                        onClick={(e) => e.stopPropagation()} 
                    >

                        {/* Modal Content Panel */}
                        <div className="flex-1 p-6 flex flex-col">
                            <h2 className="text-xl font-semibold mb-6 text-white">Delete conversation?</h2>
                            <p>This conversation will be permanently deleted and cannot be recovered.</p>
                            
                            <div className="flex justify-around text-sm text-neutral-300 mt-8">
                                <button className="hover:bg-gray-800 text-red-400 px-4 py-2 rounded-2xl" onClick={() => deleteConvo(deleteModal)}>Delete</button>
                                <button className="hover:bg-gray-800 px-4 py-2 rounded-2xl">Cancel</button>
                            </div>
                        </div>

                        {/* Close Icon Button */}
                        <button 
                            onClick={() => setDeleteModal("")} 
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            <Sidebar setActiveTab={setActiveTab} userID={userID} setCurrentConversation={setCurrentConversation} setMessages= {setMessages} conversations={conversations} setConversations={setConversations} setDeleteModal={setDeleteModal}/>

            <section className="flex-1 flex flex-col min-h-0">
                <button className="flex text-white hover:bg-gray-800 transition-colors max-w-32 justify-center items-center gap-2 rounded-2xl text-2xl ml-8">
                    Llama3
                    <img className="w-4 h-4" src={dropdown} alt="dropdown"></img>
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
                    <div className="flex-1 flex justify-center items-start">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            sendMessage={sendMessage}
                            addUploadMsg={addUploadMsg}
                            addMsg={addMsg}
                            sessionId={currentConversation}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center pb-8">
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            sendMessage={sendMessage}
                            addUploadMsg={addUploadMsg}
                            addMsg={addMsg}
                            sessionId={currentConversation}
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