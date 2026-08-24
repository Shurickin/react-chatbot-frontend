# AI Chatbot Frontend

A modern React frontend for a full-stack AI chatbot application powered by a FastAPI backend and configurable language models. The application provides real-time streaming responses, conversation management, document uploads, RAG-powered document conversations, model selection, and Firebase authentication.

The frontend is designed as a responsive chat interface and communicates with the backend through a REST API.

## ✨ Features

* 💬 **Real-time AI chat** with streamed responses
* ⚡ **Streaming UI** that displays model output as it is generated
* 🧠 **Conversation history** with automatically generated chat titles
* 🆕 **Multiple conversations** with the ability to start new chats
* 🤖 **Model selection** allowing users to switch between available language models
* 📄 **PDF document uploads** for RAG-powered conversations
* 🔍 **Document-aware conversations** through backend retrieval
* 📝 **Markdown rendering** for formatted AI responses
* 📊 **Markdown table support** for structured responses
* 🔐 **Firebase Authentication** for user identity and access
* 📱 **Responsive interface** built with Tailwind CSS
* ☁️ **Production deployment** with Render
* 🔗 **Environment-based API configuration**

---

## ☁️ Deployment

The frontend is deployed and publicly available through Render.

### Live Application

**[Try the AI Chatbot](https://react-chatbot-frontend.onrender.com)**

The deployed application connects to the production FastAPI backend and can be used without setting up the project locally.

### Deploy Your Own

The frontend can also be deployed as a static site using Render.

The production build is generated with:

```bash
npm run build
```

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │   Firebase Auth      │
                    │                      │
                    │  User Authentication │
                    │  User Identity        │
                    └──────────┬───────────┘
                               │
                               │
┌──────────────────────────────▼───────────────────────────┐
│                     React Frontend                       │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │ Chat UI     │  │ Chat History │  │ Model Selection│ │
│  └─────────────┘  └──────────────┘  └────────────────┘ │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐                     │
│  │ PDF Upload  │  │ Markdown UI  │                     │
│  └─────────────┘  └──────────────┘                     │
└──────────────────────────┬───────────────────────────────┘
                           │
                           │ REST API / Streaming
                           ▼
                ┌─────────────────────────┐
                │    FastAPI Backend      │
                │                         │
                │  /ask                   │
                │  /upload                │
                │  /new-chat              │
                └────────────┬────────────┘
                             │
                       ┌─────┴──────┐
                       │            │
                       ▼            ▼
                ┌────────────┐  ┌────────────┐
                │ Conversation│  │    RAG     │
                │   Memory    │  │            │
                └────────────┘  └──────┬─────┘
                                       │
                                       ▼
                              ┌────────────────┐
                              │  LLM Provider  │
                              │                │
                              │ Chat Models    │
                              │ Embeddings     │
                              └────────────────┘
```

---

## 🛠️ Technologies

* **React** — UI development
* **Vite** — frontend build tooling and development server
* **Tailwind CSS** — responsive styling
* **JavaScript** — application logic
* **React Markdown** — Markdown response rendering
* **remark-gfm** — GitHub-Flavored Markdown and table support
* **Firebase** — authentication
* **Fetch API** — communication with the FastAPI backend
* **Render** — production deployment

---

## 🚀 Getting Started

### Requirements

* Node.js 18+
* npm
* Running instance of the FastAPI backend
* Firebase project configured for authentication

### Installation

Clone the repository:

```bash
git clone https://github.com/Shurickin/react-chatbot-frontend.git
cd react-chatbot-frontend
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://127.0.0.1:8000
```

`VITE_API_URL` specifies the URL of the FastAPI backend.

For production, this should point to the deployed backend rather than the local development server.

### Run Locally

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 💬 Chat Features

### Streaming Responses

AI responses are streamed from the FastAPI backend and progressively displayed in the interface rather than waiting for the entire response to be generated.

This provides a more interactive experience similar to modern AI chat applications.

### Markdown Rendering

AI responses are rendered using Markdown, allowing models to return formatted content such as:

* Headings
* Bold and italic text
* Lists
* Code blocks
* Links
* Tables

GitHub-Flavored Markdown support is provided through `remark-gfm`.

### Model Selection

Users can select between available language models directly from the chat interface.

The selected model is sent to the backend with the user's request, allowing the application to support multiple models without requiring a separate frontend deployment for each model.

---

## 📄 Document Conversations

Users can upload PDF documents directly through the chat interface.

The frontend sends the uploaded document to the FastAPI backend, where it is processed for Retrieval-Augmented Generation.

```text
User
 │
 │ Upload PDF
 ▼
React Frontend
 │
 │ POST /upload
 ▼
FastAPI Backend
 │
 ├── Extract text
 ├── Split into chunks
 ├── Generate embeddings
 └── Store document data
 │
 ▼
RAG Retrieval
 │
 ▼
AI Response
```

Users can then ask questions about uploaded documents through the normal chat interface.

---

## 🔐 Authentication

Firebase Authentication is used to manage user identity.

The frontend integrates Firebase to provide authenticated user sessions and associate conversations with individual users.

Authentication is handled separately from the FastAPI API layer.

---

## 📁 Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Sidebar.jsx
│   ├── ChatInput.jsx
│   ├── ChatMsgs.jsx
│   ├── ChatData.js
│   ├── UploadDocument.jsx
│   └── ...
│
├── views/
│   └── Home.jsx
│
├── services/
│   ├── api.js
│   └── upload.js
│
├── App.jsx
├── main.jsx
└── ...
```

---

## 🔌 Backend

This project requires the accompanying FastAPI backend.

The backend is responsible for:

* AI model requests
* Streaming responses
* Conversation management
* PDF processing
* Embedding generation
* Vector search
* RAG
* Tool calling

The frontend communicates with the backend through its REST API.

---

## 🔮 Future Improvements

* 📱 Further mobile UI optimization
* 🎨 Additional theme customization
* 📎 Support for additional document formats
* 🗂️ Improved document management
* 🔎 Enhanced conversation search
* ⚙️ Additional model configuration options
* 💾 Persistent conversation storage

---

## 📄 License

This project is licensed under the MIT License.

---

### One thing I'd change from your original README

I **wouldn't put "Markdown rendering" or "Mobile responsiveness" under future improvements anymore**. Those are already things you've implemented. Likewise, "Multiple document support" depends on what your current backend actually supports, so I wouldn't claim it as a future feature unless that's genuinely still something you want to build.

And this README now makes the project look much more like what it actually is: **a full-stack AI application with authentication, streaming, RAG, tool calling, model selection, and a modern React UI**, rather than simply "a React chatbot."
