import { llmService } from '../services/llmService';
import { ChatMessage } from '../types/message';

/**
 * Example demonstrating the LLM invoke pattern
 */
async function demonstrateBasicExample() {
  console.log('🚀 Running basic LLM invoke example...\n');

  const messages: ChatMessage[] = [
    { role: "user", content: "Hi! I'm Bob" },
    { role: "assistant", content: "Hello Bob! How can I assist you today?" },
    { role: "user", content: "What's my name?" },
  ];

  try {
    const response = await llmService.invoke(messages);
    console.log('📝 Messages sent:');
    messages.forEach((msg, index) => {
      console.log(`${index + 1}. ${msg.role}: ${msg.content}`);
    });
    
    console.log(`\n🤖 AI Response: ${response}`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  demonstrateBasicExample();
}

export { demonstrateBasicExample }; 