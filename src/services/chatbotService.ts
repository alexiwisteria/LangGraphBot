import { ChatMessage, ChatbotResponse } from '../types/message';
import { llmService } from './llmService';
import { messagePersistence } from './messagePersistence';

class ChatbotService {
  /**
   * Send a message and get a response
   */
  async sendMessage(userMessage: string, conversationId?: string): Promise<ChatbotResponse> {
    // Create new conversation if none provided
    if (!conversationId) {
      conversationId = messagePersistence.createConversation();
    }

    // Add user message to conversation
    const userChatMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
    };
    messagePersistence.addMessage(conversationId, userChatMessage);

    // Get conversation history
    const conversationHistory = messagePersistence.getMessages(conversationId);

    // Generate AI response
    const aiResponseContent = await llmService.generateResponse(userMessage, conversationHistory);

    // Add AI response to conversation
    const aiChatMessage: ChatMessage = {
      role: 'assistant',
      content: aiResponseContent,
    };
    messagePersistence.addMessage(conversationId, aiChatMessage);

    return {
      message: aiChatMessage,
      conversationId,
    };
  }

  /**
   * Get conversation history
   */
  getConversationHistory(conversationId: string): ChatMessage[] {
    return messagePersistence.getMessages(conversationId);
  }

  /**
   * Create a new conversation
   */
  createConversation(): string {
    return messagePersistence.createConversation();
  }

  /**
   * Get all conversations
   */
  getAllConversations() {
    return messagePersistence.getAllConversations();
  }

  /**
   * Delete a conversation
   */
  deleteConversation(conversationId: string): boolean {
    return messagePersistence.deleteConversation(conversationId);
  }

  /**
   * Test the chatbot with the specific example
   */
  async testExample(): Promise<void> {
    console.log('Testing chatbot with example...');
    await llmService.testExample();
  }
}

// Export a singleton instance
export const chatbotService = new ChatbotService(); 