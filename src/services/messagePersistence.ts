import { ChatMessage, Conversation } from '../types/message';
import { v4 as uuidv4 } from 'uuid';

class MessagePersistenceService {
  private conversations: Map<string, Conversation> = new Map();

  /**
   * Create a new conversation
   */
  createConversation(): string {
    const conversationId = uuidv4();
    const conversation: Conversation = {
      id: conversationId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.conversations.set(conversationId, conversation);
    return conversationId;
  }

  /**
   * Add a message to an existing conversation
   */
  addMessage(conversationId: string, message: ChatMessage): void {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }

    const messageWithTimestamp: ChatMessage = {
      ...message,
      timestamp: new Date(),
    };

    conversation.messages.push(messageWithTimestamp);
    conversation.updatedAt = new Date();
  }

  /**
   * Get all messages for a conversation
   */
  getMessages(conversationId: string): ChatMessage[] {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }
    return conversation.messages;
  }

  /**
   * Get a conversation by ID
   */
  getConversation(conversationId: string): Conversation | undefined {
    return this.conversations.get(conversationId);
  }

  /**
   * Get all conversations
   */
  getAllConversations(): Conversation[] {
    return Array.from(this.conversations.values());
  }

  /**
   * Delete a conversation
   */
  deleteConversation(conversationId: string): boolean {
    return this.conversations.delete(conversationId);
  }

  /**
   * Clear all conversations
   */
  clearAllConversations(): void {
    this.conversations.clear();
  }
}

// Export a singleton instance
export const messagePersistence = new MessagePersistenceService(); 