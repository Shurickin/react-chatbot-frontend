# AI Chatbot Frontend

A modern React frontend for an AI chatbot powered by a FastAPI backend and Ollama. The application supports real-time streaming responses, conversation history, and document uploads for Retrieval-Augmented Generation (RAG).

## Features

- 💬 Chat interface with streaming AI responses
- 📂 Upload PDF documents
- 🧠 Conversation history
- ⚡ Fast React + Vite development environment
- 🎨 Responsive UI built with Tailwind CSS
- 🔄 Real-time updates while the model generates text

## Technologies

- React
- Vite
- Tailwind CSS
- JavaScript
- Fetch API

## Screenshots

*(Add screenshots here)*

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/chatbot-frontend.git
cd chatbot-frontend
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

## Project Structure

```
src/
│
├── components/
│   ├── Sidebar.jsx
│   ├── ChatInput.jsx
│   ├── UploadDocument.jsx
│   └── ...
│
├── pages/
│   └── Home.jsx
│
├── services/
│   ├── api.js
│   └── upload.js
│
└── App.jsx
```

---

## Backend

This project requires the FastAPI backend to be running.

See the backend repository for setup instructions.

---

## Future Improvements

- User authentication
- Multiple document support
- Markdown rendering
- Syntax highlighting
- Mobile responsiveness
- Theme customization

## License

MIT
