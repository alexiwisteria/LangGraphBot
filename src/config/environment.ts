import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
};

// Validate required environment variables
export function validateEnvironment(): void {
  if (!config.openai.apiKey) {
    throw new Error('OPENAI_API_KEY is required in environment variables');
  }
} 