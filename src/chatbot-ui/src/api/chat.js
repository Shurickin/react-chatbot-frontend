export async function askQuestion(sessionId, question) {
    const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            session_id: sessionId,
            question: question
        })
    });

    return await response.json();
}