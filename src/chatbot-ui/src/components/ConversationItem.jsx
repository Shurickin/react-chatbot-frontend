import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { renameTitle, loadConversations } from "../api/chat";

export default function ConversationItem({ chat, openMenuId, setOpenMenuId, toggleMenu, handleConversationClick, editingId, editedTitle, setEditedTitle, setEditingId, userID, setConversations, setDeleteModal }) {
    const [menuPosition, setMenuPosition] = useState(null);

    const handleRenameClick = (e, id, title) => {
        e.stopPropagation();
        console.log("In renameClick!")
        setOpenMenuId(null);
        setEditingId(id);
        setEditedTitle(title);
    };

    const handleRenameSubmit = async (id, title) => {
        console.log("In renameSubmit!")
        if(title === chat.title){
            setEditingId(null);
            setEditedTitle("");
            return;
        }
        try {
            await renameTitle(id, title);
            await loadConversations(userID, setConversations);

            setEditingId(null);
            setEditedTitle("");
        } catch (err) {
            console.error("Failed to rename conversation:", err);
        }
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        console.log("In deleteClick!")
        setOpenMenuId(null);
        setDeleteModal(id);
    };

    return (
        <div
            className="group flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleConversationClick(chat.conversation_id)}
        >
            {editingId === chat.conversation_id ? (
                <input
                    autoFocus
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => handleRenameSubmit(chat.conversation_id, editedTitle)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleRenameSubmit(chat.conversation_id, editedTitle);
                        }

                        if (e.key === "Escape") {
                            setEditingId(null);
                            setEditedTitle("");
                        }
                    }}
                />
            ) : (
                <p className="text-sm truncate">
                    {chat.title}
                </p>
            )}
            
            <div>
                <button
                    onClick={(e) => {
                        toggleMenu(e, chat.conversation_id);

                        const rect = e.currentTarget.getBoundingClientRect();

                        setMenuPosition({
                            top: rect.bottom + 8,
                            left: rect.right + 8
                        });
                    }}
                    className="
                                opacity-0
                                pointer-events-none
                                group-hover:opacity-100
                                group-hover:pointer-events-auto
                                transition-opacity
                            "
                >
                    ...
                </button>

                {openMenuId === chat.conversation_id &&
                    menuPosition &&
                    createPortal(
                        <div
                            className="
                                fixed
                                bg-gray-700
                                rounded-2xl
                                text-sm
                                w-32
                                shadow-lg
                                z-50
                            "
                            style={{
                                top: menuPosition.top,
                                left: menuPosition.left
                            }}
                        >
                            <ul className="py-2 flex flex-col items-center">
                                <li>
                                    <button className=" px-3 py-2 text-left hover:bg-gray-800 rounded-2xl" onClick={(e) => handleRenameClick(e, chat.conversation_id, chat.title)}>
                                        Rename
                                    </button>
                                </li>

                                <li>
                                    <button className="px-3 py-2 text-left hover:bg-gray-800 rounded-2xl">
                                        Pin
                                    </button>
                                </li>

                                <li>
                                    <button className="px-3 py-2 text-left hover:bg-gray-800 text-red-400 rounded-2xl" onClick={(e) => handleDeleteClick(e, chat.conversation_id)}>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                            {/* <ul className="flex flex-col items-center my-4 space-y-3">
                                <li className="w-20 flex hover:bg-gray-800 rounded-2xl justify-center">
                                    Rename
                                </li>

                                <li className="w-20 flex hover:bg-gray-800 rounded-2xl justify-center">
                                    Pin
                                </li>

                                <li className="w-20 flex hover:bg-gray-800 rounded-2xl justify-center">
                                    Delete
                                </li>
                            </ul> */}
                        </div>,
                        document.body
                    )
                }

                {/* {openMenuId === chat.conversation_id && (
                    <div className="absolute right-0 translate-x-4 mt-2 bg-gray-700 rounded-2xl text-sm w-30 h-30" onClick={(e) => e.stopPropagation()}>
                        {/* Menu /}
                        <ul className='flex flex-col items-center my-4 space-y-3'>
                            <li className='w-20 flex hover:bg-gray-800 rounded-2xl justify-center '>Rename</li>
                            <li className='w-20 flex hover:bg-gray-800 rounded-2xl justify-center '>Pin</li>
                            <li className='w-20 flex hover:bg-gray-800 rounded-2xl justify-center '>Delete</li>
                        </ul>
                    </div>
                )} */}
            </div>
        </div>
    );
}