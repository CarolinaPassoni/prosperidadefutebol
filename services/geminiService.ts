import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
// NOTE: API Key is sourced from process.env.GEMINI_API_KEY as per requirements
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateMatchPreview = async (opponentName: string, isHome: boolean): Promise<string> => {
  try {
    const prompt = `
      Você é o analista tático oficial do time de futebol "Prosperidade FC".
      O próximo jogo é contra o "${opponentName}".
      Jogo em casa: ${isHome ? 'Sim' : 'Não'}.
      
      Escreva uma prévia curta e empolgante (máximo 100 palavras) para a torcida.
      Fale sobre a importância da vitória e termine com uma frase de motivação usando a palavra "Prosperidade".
      Não invente nomes de jogadores, foque no espírito do time e na tática geral.
    `;

    // Using 'gemini-3-flash-preview' for basic text generation tasks as recommended in guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Accessing .text as a property as per @google/genai documentation
    return response.text || "Análise indisponível no momento. Avante Prosperidade!";
  } catch (error) {
    console.error("Error generating match preview:", error);
    return "Não foi possível conectar com o analista tático virtual. Vamos vencer!";
  }
};