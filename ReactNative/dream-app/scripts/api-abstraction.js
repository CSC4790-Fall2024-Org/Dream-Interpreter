import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateAnimationLink } from './gooey-api'; 

export const geminiModel = async (prompt) => {
  const genAI = new GoogleGenerativeAI('AIzaSyAcesEJt1QoKgOQ3LNbE3hRon4I0dm9bU8');
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    return await result.response.text(); 
  } catch (error) {
    console.error('Error generating Gemini content:', error);
    throw error;
  }
};

export const generateVideo = async (dreamInput) => {
  try {
    return await generateAnimationLink(dreamInput);
  } catch (error) {
    console.error('Error generating Gooey animation:', error);
    throw error;
  }
};
