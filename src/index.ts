import { validateEnvironment } from './config/environment';
import { chatbotService } from './services/chatbotService';
import { langGraphChatbot } from './services/langGraphChatbot';

async function main() {
  try {
    // Validate environment variables
    validateEnvironment();
    console.log('✅ Environment validated successfully');

    // Test the specific example from the user
    console.log('\n🧪 Testing the specific example...');
    await chatbotService.testExample();

    // Test LangGraph examples
    console.log('\n📚 Testing LangGraph Examples...');
    await langGraphChatbot.testTutorialExample();

    // Demonstrate the chatbot with conversation persistence
    console.log('\n🤖 Starting chatbot demonstration...');
    
    // Create a new conversation
    const conversationId = chatbotService.createConversation();
    console.log(`📝 Created conversation: ${conversationId}`);

    // Send first message
    console.log('\n👤 User: Hi! I\'m Bob');
    const response1 = await chatbotService.sendMessage('Hi! I\'m Bob', conversationId);
    console.log(`🤖 Assistant: ${response1.message.content}`);

    // Send second message
    console.log('\n👤 User: What\'s my name?');
    const response2 = await chatbotService.sendMessage('What\'s my name?', conversationId);
    console.log(`🤖 Assistant: ${response2.message.content}`);

    // Show conversation history
    console.log('\n📚 Conversation History:');
    const history = chatbotService.getConversationHistory(conversationId);
    history.forEach((message, index) => {
      const role = message.role === 'user' ? '👤 User' : '🤖 Assistant';
      const timestamp = message.timestamp?.toLocaleTimeString() || 'N/A';
      console.log(`${index + 1}. ${role} (${timestamp}): ${message.content}`);
    });

    // Show all conversations
    console.log('\n📋 All Conversations:');
    const allConversations = chatbotService.getAllConversations();
    allConversations.forEach((conversation, index) => {
      console.log(`${index + 1}. Conversation ${conversation.id} - ${conversation.messages.length} messages`);
    });

    console.log('\n✅ Chatbot demonstration completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the application
if (require.main === module) {
  main();
} 