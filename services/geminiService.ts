import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("API_KEY is missing. Gemini features will not work.");
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!ai) {
    initializeGemini();
    if (!ai) return "Error: API Key not configured.";
  }

  try {
    // @ts-ignore - Ensuring ai is not null via check above
    const model = ai.models.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are an expert Network Engineering teacher for SMK students. You are helping a student with their final competency exam (Uji Kompetensi Keahlian). The context involves MikroTik routers, daisy-chain topology (R1 to R10), VLSM 172.16.0.0/20, and firewall rules. Be concise, encouraging, and provide specific MikroTik commands when asked. Do not solve the whole exam for them, but guide them."
    });
    
    const result = await model.generateContent({
      contents: message,
    });
    
    const text = result.text;
    return text || "Maaf, saya tidak dapat memproses permintaan tersebut saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI. Coba lagi nanti.";
  }
};