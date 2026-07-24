import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function ConversationItem({ chat, openMenuId, setOpenMenuId, toggleMenu, handleConversationClick }) {
    const [menuPosition, setMenuPosition] = useState(null);
    return (
        <div
            className="group flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleConversationClick(chat.conversation_id)}
        >
            <p className="text-sm truncate">
                {chat.title}
            </p>

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
                            <ul className="flex flex-col items-center my-4 space-y-3">
                                <li className="w-20 flex hover:bg-gray-800 rounded-2xl justify-center">
                                    Rename
                                </li>

                                <li className="w-20 flex hover:bg-gray-800 rounded-2xl justify-center">
                                    Pin
                                </li>

                                <li className="w-20 flex hover:bg-gray-800 rounded-2xl justify-center">
                                    Delete
                                </li>
                            </ul>
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