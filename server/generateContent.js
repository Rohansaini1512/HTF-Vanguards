import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

class GoogleGenerativeAI {
  constructor(apiKey) {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.apiUrl = 'https://api.generativeai.google.com/generative-model';
  }

  async getGenerativeModel({ model }) {
    return {
      generateContent: async (prompt) => {
        try {
          const response = await axios.post(
            `${this.apiUrl}/${model}/generate`,
            { prompt },
            { headers: { 'Authorization': `Bearer ${this.apiKey}` } }
          );
          return response.data;
        } catch (error) {
          console.error('Error generating content:', error);
          throw error;
        }
      }
    };
  }
}

const run = async () => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Write a story about a magic backpack.";

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text);
  } catch (error) {
    console.error('Error:', error);
  }
};

run();