import { useState, useRef, useEffect, React } from 'react';
import { chatSummaries } from './ChatData';
import { newChat } from '../api/chat';
import logo from "../assets/logo.png";
import history from "../assets/history.png";
import newNote from "../assets/newNote.png";
import profileImg from "../assets/profileImg.png";

import { loadConversation } from '../api/chat';
import ConversationItem from './ConversationItem';

export default function ChatSidebar({setActiveTab, userID, setCurrentConversation, setMessages, conversations, setConversations, setDeleteModal}) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    const toggleMenu = (event, id) => {
        event.stopPropagation();

        console.log("toggle", id);

        setOpenMenuId(current => {
            console.log("current:", current);
            return current === id ? null : id;
        });
    };

    const handleConversationClick = async (id) => {
        setCurrentConversation(id);
        await loadConversation(id, setMessages);
    };

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            console.log("outside handler");
            
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                console.log("closing menu");
                setOpenMenuId(null);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

  return (
    <div className="w-64 h-screen bg-black text-gray-200 p-4 flex flex-col border-r border-white">
        <div className='flex items-center pb-6'>
            <img className="w-10 h-10" src={logo}/>
            <h3 className='ml-4 text-2xl'>GeorgeGPT</h3>
        </div>
        
        <button className='flex hover:bg-gray-800 transition-colors items-center rounded' onClick={() => newChat(userID, setCurrentConversation, setMessages, false)}>
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
      
        <div className="flex-1 overflow-y-auto space-y-1" ref={menuRef}>
            {conversations.map((chat) => (
                <ConversationItem 
                    key={chat.conversation_id}
                    chat={chat}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}  
                    toggleMenu={toggleMenu}  
                    handleConversationClick = {handleConversationClick}
                    editedTitle={editedTitle}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    setEditedTitle={setEditedTitle}
                    userID={userID}
                    setConversations={setConversations}
                    setDeleteModal={setDeleteModal}
                />
            // <button
            //     key={chat.conversation_id}
            //     className="w-full text-left p-2 rounded hover:bg-gray-800 transition-colors group flex flex-col"
            //     onClick={() => handleConversationClick(chat.conversation_id)}
            // >
            //     <span className="truncate text-sm font-medium w-full">
            //         {chat.title}
            //         <button 
            //             aria-label="More options"
            //             style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
            //         >
            //             ...
            //         </button>
            //         {isOpen && (
            //             <div style={{
            //             position: 'absolute',
            //             right: 0,
            //             background: 'white',
            //             border: '1px solid #ccc',
            //             boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
            //             zIndex: 10
            //             }}>
            //             <ul style={{ listStyle: 'none', margin: 0, padding: '8px 12px' }}>
            //                 <li style={{ cursor: 'pointer', padding: '4px 0' }}>Edit</li>
            //                 <li style={{ cursor: 'pointer', padding: '4px 0' }}>Delete</li>
            //             </ul>
            //             </div>
            //         )}
            //     </span>
            // </button>
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