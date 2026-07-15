import React from 'react';
import { chatSummaries } from './chatData';
import { newChat } from '../api/chat';
import logo from "../assets/logo.png";
import history from "../assets/history.png";
import newNote from "../assets/newNote.png";
import profileImg from "../assets/profileImg.png";

export default function ChatSidebar({setActiveTab, userID, setCurrentConversation, setMessages, conversations}) {
  return (
    <div className="w-64 h-screen bg-black text-gray-200 p-4 flex flex-col border-r border-white">
        <div className='flex items-center pb-6'>
            <img className="w-10 h-10" src={logo}/>
            <h3 className='ml-4 text-2xl'>GeorgeGPT</h3>
        </div>
        
        <button className='flex hover:bg-gray-800 transition-colors items-center rounded' onClick={() => newChat(userID, setCurrentConversation, setMessages)}>
            <img className="w-6 h-6" src={newNote}/>
            <p className="w-full text-left p-2 rounded  group flex flex-col">New Chat</p>
        </button>
        {/* <div className='flex hover:bg-gray-800 transition-colors items-center rounded'>
            <img className="w-6 h-6" src={newNote}/>
            <p className="w-full text-left p-2 rounded  group flex flex-col">New Chat</p>
        </div> */}

        <div className='flex hover:bg-gray-800 transition-colors items-center rounded'>
            <img className="w-6 h-6" src={history}/>
            <p className="w-full text-left p-2 rounded  group flex flex-col">History</p>
        </div>
        
        <h2 className="text-xl font-bold mb-4 mt-8 px-2">Chat History</h2>
      
        <div className="flex-1 overflow-y-auto space-y-1">
            {conversations.map((chat) => (
            <button
                key={chat.conversation_id}
                className="w-full text-left p-2 rounded hover:bg-gray-800 transition-colors group flex flex-col"
                onClick={() => setCurrentConversation(chat.conversation_id)}
            >
                <span className="truncate text-sm font-medium w-full">
                {chat.title}
                </span>
            </button>
            ))}
            {/* {chatSummaries.map((chat) => (
            <button
                key={chat.id}
                className="w-full text-left p-2 rounded hover:bg-gray-800 transition-colors group flex flex-col"
                onClick={() => console.log(`Loading chat: ${chat.id}`)}
            >
                <span className="truncate text-sm font-medium w-full">
                {chat.title}
                </span>
            </button>
            ))} */}
        </div>

        <button className="mt-auto flex items-center gap-3 border-t border-zinc-700 p-4 text-left hover:bg-zinc-800" onClick={() => setActiveTab("General")}>
            <img className="w-8 h-8" src={profileImg}/>
            <p className="font-medium">Jordan Levy</p>
        </button>
    </div>
  );
}