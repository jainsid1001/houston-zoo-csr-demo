import { GoogleGenAI } from "@google/genai";
import { AccessibilityProfile, POI } from '../types';

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing from environment variables.");
    return;
  }
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateZooAssistantResponse = async (
  userMessage: string,
  profiles: AccessibilityProfile[], // Changed to array
  pois: POI[]
): Promise<string> => {
  if (!aiClient) {
    initializeGemini();
    if (!aiClient) return "I'm sorry, I cannot connect to the zoo assistant right now. Please check your connection.";
  }

  // Flatten profile for prompt
  const profileString = profiles.join(', ');

  // Filter POI info relevant to the user's profile to save context window and focus attention
  const poiContext = pois.map(p => {
    let combinedNotes = "";
    profiles.forEach(prof => {
        if (p.accessibilityNotes[prof]) {
            combinedNotes += ` [${prof} Note: ${p.accessibilityNotes[prof]}]`;
        }
    });
    return `- ${p.name} (${p.type}): ${p.description}.${combinedNotes}`;
  }).join('\n');

  const systemInstruction = `
    You are "ZooBuddy", an AI assistant for the Houston Zoo specialized in Corporate Social Responsibility and Accessibility.
    
    Current User Profile(s): **${profileString}**
    
    Your goal is to help the guest navigate the zoo, learn about animals, and handle their specific needs based on their combined profiles.
    
    Map/Guidebook Context:
    ${poiContext}
    
    Guidelines:
    - Keep responses concise (under 3 sentences unless asked for a story).
    - Be empathetic, professional, and fun.
    - Synthesize advice based on ALL active profiles. For example, if Mobility AND Sensory are active, suggest flat routes that are also quiet.
    - Since there is no map view currently, you are the primary navigator. Give clear textual directions relative to landmarks if asked.
    - Always answer questions about the animals enthusiastically!
    - Use Markdown formatting (bold, bullet points) to make your responses easy to read on mobile.
  `;

  try {
    const response = await aiClient!.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm having trouble thinking of an answer right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently offline. Please ask a staff member for assistance.";
  }
};