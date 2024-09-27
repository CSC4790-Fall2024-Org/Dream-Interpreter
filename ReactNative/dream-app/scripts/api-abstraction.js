import { model } from "./gemini-api";
import { generateAnimationLink } from './gooey-api'; 

export const textModel = async (prompt) => {
  const textModel = model;

  try {
    const result = await textModel.generateContent(prompt);
    return await result.response.text(); 
  } catch (error) {
    console.error('Error generating Gemini content:', error);
    throw error;
  }
};

export function generateVideo(dreamInput) {
  try {
    return generateAnimationLink(dreamInput);
  } catch (error) {
    console.error('Error generating Gooey animation:', error);
    throw error;
  }
};
