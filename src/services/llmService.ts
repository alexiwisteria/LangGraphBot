import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { ChatMessage } from '../types/message';
import { config } from '../config/environment';

class LLMService {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: config.openai.apiKey,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    });
  }

  /**
   * Convert ChatMessage to LangChain message format
   */
  private convertToLangChainMessages(messages: ChatMessage[]) {
    return messages.map(msg => {
      switch (msg.role) {
        case 'user':
          return new HumanMessage(msg.content);
        case 'assistant':
          return new AIMessage(msg.content);
        case 'system':
          return new SystemMessage(msg.content);
        default:
          throw new Error(`Unknown message role: ${msg.role}`);
      }
    });
  }

  /**
   * Invoke the LLM with a sequence of messages
   */
  async invoke(messages: ChatMessage[]): Promise<string> {
    try {
      const langChainMessages = this.convertToLangChainMessages(messages);
      const response = await this.llm.invoke(langChainMessages);
      return response.content as string;
    } catch (error) {
      console.error('Error invoking LLM:', error);
      throw new Error(`Failed to get response from LLM: ${error}`);
    }
  }

  /**
   * Generate a response for a user message with conversation context
   */
  async generateResponse(userMessage: string, conversationHistory: ChatMessage[]): Promise<string> {
    const messages: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    return this.invoke(messages);
  }

  /**
   * Test the LLM with the specific example
   */
  async testExample(): Promise<void> {
    const testMessages: ChatMessage[] = [
      { role: "user", content: "Hi! I'm Bob" },
      { role: "assistant", content: "Hello Bob! How can I assist you today?" },
      { role: "user", content: "What's my name?" },
    ];

    try {
      const response = await this.invoke(testMessages);
      console.log('Test response:', response);
    } catch (error) {
      console.error('Test failed:', error);
    }
  }
}

// Export a singleton instance
export const llmService = new LLMService(); 