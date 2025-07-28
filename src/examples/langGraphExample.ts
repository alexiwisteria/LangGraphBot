import { langGraphChatbot } from '../services/langGraphChatbot';

/**
 * Comprehensive example demonstrating LangGraph chatbot capabilities
 */
async function demonstrateLangGraphFeatures() {
  console.log('🚀 LangGraph Chatbot Feature Demonstrations\n');

  try {
    // 1. Test the basic example
    console.log('📝 1. Testing Basic Example:');
    await langGraphChatbot.testTutorialExample();
    console.log('');

    // 2. Basic chat with message persistence
    console.log('💬 2. Basic Chat with Message Persistence:');
    const thread1 = await langGraphChatbot.basicChat("Hi! I'm Alice.");
    console.log(`Thread ID: ${thread1.threadId}`);
    console.log(`Response: ${thread1.response.content}`);
    
    const response2 = await langGraphChatbot.basicChat("What's my name?", thread1.threadId);
    console.log(`Follow-up: ${response2.response.content}`);
    console.log('');

    // 3. Pirate chatbot
    console.log('🏴‍☠️ 3. Pirate Chatbot:');
    const pirateThread = await langGraphChatbot.pirateChat("Hi! I'm Captain Jack.");
    console.log(`Pirate Response: ${pirateThread.response.content}`);
    
    const pirateResponse2 = await langGraphChatbot.pirateChat("What's my name?", pirateThread.threadId);
    console.log(`Pirate Follow-up: ${pirateResponse2.response.content}`);
    console.log('');

    // 4. Multi-language chatbot
    console.log('🌍 4. Multi-language Chatbot:');
    const spanishThread = await langGraphChatbot.languageChat("Hi! I'm Maria.", "Spanish");
    console.log(`Spanish Response: ${spanishThread.response.content}`);
    
    const spanishResponse2 = await langGraphChatbot.languageChat("What's my name?", "Spanish", spanishThread.threadId);
    console.log(`Spanish Follow-up: ${spanishResponse2.response.content}`);
    console.log('');

    // 5. Chatbot with message trimming
    console.log('✂️ 5. Chatbot with Message Trimming:');
    const trimmingThread = await langGraphChatbot.trimmingChat("Hi! I'm Bob.", "English");
    console.log(`Trimming Response: ${trimmingThread.response.content}`);
    
    const trimmingResponse2 = await langGraphChatbot.trimmingChat("What's my name?", "English", trimmingThread.threadId);
    console.log(`Trimming Follow-up: ${trimmingResponse2.response.content}`);
    console.log('');

    // 6. Demonstrate thread isolation
    console.log('🔒 6. Thread Isolation Test:');
    const newThread = await langGraphChatbot.basicChat("What's my name?");
    console.log(`New thread response: ${newThread.response.content}`);
    console.log('');

    console.log('✅ All LangGraph features demonstrated successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  demonstrateLangGraphFeatures();
}

export { demonstrateLangGraphFeatures }; 