import * as readline from 'readline';
import { chatbotService } from '../services/chatbotService';
import { validateEnvironment } from '../config/environment';

class InteractiveChat {
  private rl: readline.Interface;
  private conversationId: string;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.conversationId = chatbotService.createConversation();
  }

  async start() {
    console.log('🤖 Welcome to the Interactive LangChain Chatbot!');
    console.log('💡 Type your messages and press Enter. Type "quit" to exit.');
    console.log('📝 Conversation ID:', this.conversationId);
    console.log('─'.repeat(50));

    this.askQuestion();
  }

  private askQuestion() {
    this.rl.question('👤 You: ', async (input) => {
      if (input.toLowerCase() === 'quit') {
        console.log('👋 Goodbye!');
        this.rl.close();
        return;
      }

      try {
        const response = await chatbotService.sendMessage(input, this.conversationId);
        console.log(`🤖 Assistant: ${response.message.content}`);
        console.log('─'.repeat(50));
      } catch (error) {
        console.error('❌ Error:', error);
      }

      this.askQuestion();
    });
  }
}

async function main() {
  try {
    validateEnvironment();
    const chat = new InteractiveChat();
    await chat.start();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the interactive chat if this file is executed directly
if (require.main === module) {
  main();
}

export { InteractiveChat }; 