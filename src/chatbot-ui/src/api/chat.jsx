// export async function askQuestion(sessionId, question) {
//     const response = await fetch("http://127.0.0.1:8000/ask", {
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

export async function askQuestion(sessionId, question, onChunk) {
    const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            session_id: sessionId,
            question: question,
        }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        const chunk = decoder.decode(value, { stream: true });

        // console.log("CHUNK:", chunk);

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
            const response = await fetch("http://localhost:8000/upload", {
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
    const response = await fetch("http://127.0.0.1:8000/add-to-db-msgs", {
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