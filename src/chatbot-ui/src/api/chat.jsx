// export async function askQuestion(sessionId, question) {
//     const response = await fetch(`${API_URL}/ask`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             session_id: sessionId,
//             question: question
//         })
//     });

//     return await response.json();
// }
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function askQuestion(conversationId, question, selectedModel, onChunk) {
    const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            session_id: conversationId,
            question: question,
            model: selectedModel,
        }),
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        const chunk = decoder.decode(value, { stream: true });

        console.log("CHUNK:", chunk);

        onChunk(chunk);
    }
}

export function UploadDocument({addUploadMsg, addMsg, sessionId}) {
    const [uploadStatus, setUploadStatus] = useState("idle");

    const [uploadedFile, setUploadedFile] = useState("");

    const uploadFile = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        setUploadStatus("uploading");
        setUploadedFile(file.name);

        addMsg("user", `Uploaded ${file.name}`)

        await addToDB(sessionId, "user", `Uploaded ${file.name}`);

        addMsg("assistant", `Uploading "${file.name}"...`)

        //await new Promise(resolve => setTimeout(resolve, 1000000000));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${API_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            setUploadStatus("success");
            addUploadMsg(`Upload Successful! You can now ask questions about ${file.name}`);
            await addToDB(
                sessionId,
                "assistant",
                `✓ Upload Successful! You can now ask questions about ${file.name}.`
            );
        } catch {
            setUploadStatus("error");
            addUploadMsg("Upload Failed!")
            await addToDB(
                sessionId,
                "assistant",
                `Upload Failed!`
            );
        }

        event.target.value = "";
    };

    return (
        <div className="ml-4">
            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={uploadFile}
            />
            <label
                htmlFor="file-upload"
                className="cursor-pointer text-gray-500 hover:text-cyan-400 text-3xl"
            >
                +
            </label>
        </div>
    );
}

export async function addToDB(session_id, role, message) {
    const response = await fetch(`${API_URL}/add-to-db-msgs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            session_id: session_id,
            role: role,
            content: message
        }),
    });
    
    if (response.ok){
        console.log("Message Added Successfully!")
    }
    else{
        console.log("Message Not Added to DB!")
    }

}

export async function newChat(userID, setCurrentConversation, setMessages, insideSendMsg) {
    console.log("insideSendMsg =", insideSendMsg);
    
    const response = await fetch(`${API_URL}/new-chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userID
        }),
    });
    
    if (response.ok){
        const data = await response.json();

        console.log("New convo started!");
        console.log(data);

        setCurrentConversation(data.conversation_id);
        if(!insideSendMsg){
            setMessages([]);
        }
        return data.conversation_id;
    }
    else{
        console.log("Failed to start new convo!")
    }
}

export async function loadConversations(userID, setConversations) {
    const response = await fetch(`${API_URL}/conversations/${userID}`);

    if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
    }
    else{
        console.log("Failed to load Convos!")
    }
}

export async function loadConversation(conversation_id, setMessages) {
    const response = await fetch(`${API_URL}/conversation/${conversation_id}`);

    if (response.ok) {
        const data = await response.json();
        setMessages(data.conversation);
    }
    else{
        console.log("Failed to load Convos!")
    }
}

export async function addUser(userID, email) {
    const response = await fetch(`${API_URL}/add-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userID,
            email: email
        }),
    });
    
    if (response.ok){
        const data = await response.json();

        console.log("New user added!");
        console.log(data);
    }
    else{
        console.log("Failed to add user!")
    }
}

export async function renameTitle(conversation_id, title) {
    const response = await fetch(`${API_URL}/rename-title`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            conversation_id: conversation_id,
            title: title
        }),
    });
    
    if (response.ok){
        const data = await response.json();

        console.log("New title added!");
        console.log(data);
    }
    else{
        console.log("Failed to change title!")
    }
}

export async function deleteConvo(conversation_id) {
    const response = await fetch(`${API_URL}/delete-convo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            conversation_id: conversation_id
        }),
    });
    
    if (response.ok){
        const data = await response.json();

        console.log("Convo deleted!");
        console.log(data);
    }
    else{
        console.log("Failed to delete!")
    }
}