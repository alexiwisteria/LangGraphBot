import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation,
} from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { v4 as uuidv4 } from "uuid";
import { config } from "../config/environment";

class LangGraphChatbotService {
  private llm: ChatOpenAI;
  private app: any;
  private appWithPrompt: any;
  private appWithLanguage: any;
  private appWithTrimming: any;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: config.openai.apiKey,
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });

    this.initializeApps();
  }

  private initializeApps() {
    // Basic app with just message persistence
    this.app = this.createBasicApp();
    
    // App with pirate prompt
    this.appWithPrompt = this.createPromptApp();
    
    // App with language support
    this.appWithLanguage = this.createLanguageApp();
    
    // App with message trimming
    this.appWithTrimming = this.createTrimmingApp();
  }

  private createBasicApp() {
    // Define the function that calls the model
    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const response = await this.llm.invoke(state.messages);
      return { messages: [response] };
    };

    // Define a new graph
    const workflow = new StateGraph(MessagesAnnotation)
      .addNode("model", callModel)
      .addEdge(START, "model")
      .addEdge("model", END);

    // Add memory
    const memory = new MemorySaver();
    return workflow.compile({ checkpointer: memory });
  }

  private createPromptApp() {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You talk like a pirate. Answer all questions to the best of your ability.",
      ],
      ["placeholder", "{messages}"],
    ]);

    // Define the function that calls the model
    const callModel = async (state: typeof MessagesAnnotation.State) => {
      const prompt = await promptTemplate.invoke(state);
      const response = await this.llm.invoke(prompt);
      return { messages: [response] };
    };

    // Define a new graph
    const workflow = new StateGraph(MessagesAnnotation)
      .addNode("model", callModel)
      .addEdge(START, "model")
      .addEdge("model", END);

    return workflow.compile({ checkpointer: new MemorySaver() });
  }

  private createLanguageApp() {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
      ],
      ["placeholder", "{messages}"],
    ]);

    // Define the function that calls the model
    const callModel = async (state: any) => {
      const prompt = await promptTemplate.invoke(state);
      const response = await this.llm.invoke(prompt);
      return { messages: [response] };
    };

    // Define a new graph with proper annotation
    const GraphAnnotation = Annotation.Root({
      ...MessagesAnnotation.spec,
      language: Annotation<string>(),
    });

    const workflow = new StateGraph(GraphAnnotation)
      .addNode("model", callModel)
      .addEdge(START, "model")
      .addEdge("model", END);

    return workflow.compile({ checkpointer: new MemorySaver() });
  }

  private createTrimmingApp() {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
      ],
      ["placeholder", "{messages}"],
    ]);

    // Define the function that calls the model with trimming
    const callModel = async (state: any) => {
      // Simple trimming - keep last 10 messages
      const trimmedMessages = state.messages.slice(-10);
      const prompt = await promptTemplate.invoke({
        messages: trimmedMessages,
        language: state.language,
      });
      const response = await this.llm.invoke(prompt);
      return { messages: [response] };
    };

    // Define a new graph with proper annotation
    const GraphAnnotation = Annotation.Root({
      ...MessagesAnnotation.spec,
      language: Annotation<string>(),
    });

    const workflow = new StateGraph(GraphAnnotation)
      .addNode("model", callModel)
      .addEdge(START, "model")
      .addEdge("model", END);

    return workflow.compile({ checkpointer: new MemorySaver() });
  }

  /**
   * Basic chatbot with message persistence
   */
  async basicChat(message: string, threadId?: string) {
    const config = { configurable: { thread_id: threadId || uuidv4() } };
    const input = [{ role: "user", content: message }];
    const output = await this.app.invoke({ messages: input }, config);
    return {
      response: output.messages[output.messages.length - 1],
      threadId: config.configurable.thread_id,
    };
  }

  /**
   * Pirate chatbot with prompt template
   */
  async pirateChat(message: string, threadId?: string) {
    const config = { configurable: { thread_id: threadId || uuidv4() } };
    const input = [{ role: "user", content: message }];
    const output = await this.appWithPrompt.invoke({ messages: input }, config);
    return {
      response: output.messages[output.messages.length - 1],
      threadId: config.configurable.thread_id,
    };
  }

  /**
   * Multi-language chatbot
   */
  async languageChat(message: string, language: string, threadId?: string) {
    const config = { configurable: { thread_id: threadId || uuidv4() } };
    const input = {
      messages: [{ role: "user", content: message }],
      language,
    };
    const output = await this.appWithLanguage.invoke(input, config);
    return {
      response: output.messages[output.messages.length - 1],
      threadId: config.configurable.thread_id,
    };
  }

  /**
   * Chatbot with message trimming
   */
  async trimmingChat(message: string, language: string, threadId?: string) {
    const config = { configurable: { thread_id: threadId || uuidv4() } };
    const input = {
      messages: [{ role: "user", content: message }],
      language,
    };
    const output = await this.appWithTrimming.invoke(input, config);
    return {
      response: output.messages[output.messages.length - 1],
      threadId: config.configurable.thread_id,
    };
  }

  /**
   * Test the basic example
   */
  async testTutorialExample() {
    console.log("🧪 Testing basic example...");
    
    const config = { configurable: { thread_id: uuidv4() } };
    
    // First message
    const input1 = [{ role: "user", content: "Hi! I'm Bob." }];
    const output1 = await this.app.invoke({ messages: input1 }, config);
    console.log("First response:", output1.messages[output1.messages.length - 1].content);
    
    // Second message
    const input2 = [{ role: "user", content: "What's my name?" }];
    const output2 = await this.app.invoke({ messages: input2 }, config);
    console.log("Second response:", output2.messages[output2.messages.length - 1].content);
    
    // Test with different thread
    const config2 = { configurable: { thread_id: uuidv4() } };
    const input3 = [{ role: "user", content: "What's my name?" }];
    const output3 = await this.app.invoke({ messages: input3 }, config2);
    console.log("New thread response:", output3.messages[output3.messages.length - 1].content);
    
    // Back to original thread
    const output4 = await this.app.invoke({ messages: input2 }, config);
    console.log("Back to original thread:", output4.messages[output4.messages.length - 1].content);
  }
}

// Export a singleton instance
export const langGraphChatbot = new LangGraphChatbotService(); 