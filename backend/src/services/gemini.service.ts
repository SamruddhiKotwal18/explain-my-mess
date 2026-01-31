import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not set in environment variables");
            // Depending on strictness, we might rename this or let it fail later
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        // Using gemini-1.5-flash for efficiency and multimodal support
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async analyze(prompt: string, image?: { mimeType: string; data: string }): Promise<string> {
        try {
            const parts: any[] = [{ text: prompt }];

            if (image) {
                parts.push({
                    inlineData: {
                        data: image.data, // Expecting base64 string
                        mimeType: image.mimeType
                    }
                });
            }

            const result = await this.model.generateContent(parts);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Error analyzing content with Gemini:", error);
            throw new Error("Failed to analyze content");
        }
    }
}
