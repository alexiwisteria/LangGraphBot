# LangGraph Chatbot

A demonstration of LangGraph's chatbot capabilities with message persistence, conversation management, and advanced features.

## 🚀 Quick Start - Test the Chatbot

**The primary way to test the chatbot is through the interactive chat:**

```bash
npm run chat
```

This will start an interactive chatbot where you can type messages and see responses in real-time. Type "quit" to exit.

## Features

- 🤖 **LangGraph Integration**: Uses OpenAI's GPT models via LangGraph
- 💾 **Message Persistence**: Stores conversation history using MemorySaver
- 🗂️ **Conversation Management**: Create, retrieve, and manage multiple conversations
- 📝 **TypeScript**: Fully typed for better development experience
- 🏴‍☠️ **Prompt Templates**: Includes pirate chatbot and multi-language support
- ✂️ **Message Trimming**: Manages conversation history to prevent context overflow
- 🔒 **Thread Isolation**: Supports multiple conversation threads with proper isolation

## Prerequisites

- Node.js (v16 or higher)
- OpenAI API key

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Other Usage Options

### Run the main chatbot demonstration:
```bash
npm run dev
```

### Run the basic LLM example:
```bash
npm run example
```

### Run the LangGraph examples:
```bash
npm run langgraph
```

### Build and run production version:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── config/
│   └── environment.ts          # Environment configuration
├── types/
│   └── message.ts             # TypeScript interfaces
├── services/
│   ├── llmService.ts          # LangChain LLM interactions
│   ├── messagePersistence.ts  # Message storage and retrieval
│   ├── chatbotService.ts      # Main chatbot coordination
│   └── langGraphChatbot.ts    # LangGraph implementation
├── examples/
│   ├── basicExample.ts        # Basic LLM invoke example
│   ├── langGraphExample.ts    # LangGraph feature demonstrations
│   └── interactiveChat.ts     # Interactive chatbot demo
└── index.ts                   # Main application entry point
```

## Key Features

### 1. LangGraph Chatbot (`src/services/langGraphChatbot.ts`)
Core LangGraph implementation:
- **StateGraph & MessagesAnnotation**: Proper state management
- **MemorySaver**: Built-in persistence layer
- **Thread Isolation**: Multiple conversation threads
- **Prompt Templates**: Pirate chatbot and multi-language support
- **Message Trimming**: Prevents context overflow

### 2. LLM Service (`src/services/llmService.ts`)
Handles all interactions with OpenAI via LangChain:
- Converts custom message format to LangChain format
- Provides the exact `invoke()` pattern
- Includes error handling and logging

### 3. Message Persistence (`src/services/messagePersistence.ts`)
Manages conversation storage:
- In-memory storage with conversation IDs
- Timestamp tracking for all messages
- Full CRUD operations for conversations

### 4. Chatbot Service (`src/services/chatbotService.ts`)
Main coordination layer:
- Handles user messages and AI responses
- Manages conversation flow
- Provides clean API for the application

### 5. LangGraph Examples (`src/examples/langGraphExample.ts`)
Demonstrates LangGraph features:
- Basic message persistence
- Pirate chatbot with prompt templates
- Multi-language support
- Message trimming
- Thread isolation

## API Reference

### LangGraphChatbot

```typescript
// Basic chat with message persistence
const response = await langGraphChatbot.basicChat("Hello!", threadId);

// Pirate chatbot
const pirateResponse = await langGraphChatbot.pirateChat("Hi!", threadId);

// Multi-language chatbot
const spanishResponse = await langGraphChatbot.languageChat("Hello!", "Spanish", threadId);

// Chatbot with message trimming
const trimmedResponse = await langGraphChatbot.trimmingChat("Hello!", "English", threadId);
```

### ChatbotService

```typescript
// Send a message and get response
const response = await chatbotService.sendMessage("Hello!", conversationId);

// Create new conversation
const conversationId = chatbotService.createConversation();

// Get conversation history
const history = chatbotService.getConversationHistory(conversationId);

// Get all conversations
const conversations = chatbotService.getAllConversations();

// Delete conversation
chatbotService.deleteConversation(conversationId);
```

### LLMService

```typescript
// Invoke with custom message format
const response = await llmService.invoke(messages);

// Generate response with conversation context
const response = await llmService.generateResponse(userMessage, history);
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (optional, defaults to 3000)
- `NODE_ENV`: Environment mode (optional, defaults to 'development')

## Development

The project uses TypeScript with strict type checking. All files have specific responsibilities:

- **Configuration**: Environment and API key management
- **Types**: TypeScript interfaces for type safety
- **Services**: Business logic separated by responsibility
- **Examples**: Demonstrations of specific functionality

## Testing

**Primary Testing Method:**
```bash
npm run chat
```
This starts an interactive chatbot where you can test the conversation capabilities in real-time.

**Alternative Testing Methods:**
```bash
npm test
```
This will demonstrate:
1. Environment validation
2. Basic LLM invoke example
3. LangGraph feature demonstrations
4. Conversation creation and message persistence
5. Conversation history retrieval
6. Multiple conversation management
