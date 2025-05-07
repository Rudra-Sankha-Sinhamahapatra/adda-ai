import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { embed } from "ai"
import { config } from "@/config/config"


const API_KEY = config.gemini.apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if(!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set. Please check your environment variables.");
}

const googleAI = createGoogleGenerativeAI({
  apiKey: API_KEY
});

// text-embedding-004 with default dimensions (768)
const embeddingModel = googleAI.textEmbeddingModel("text-embedding-004");

// Dimensions should match with Supabase vector column
const VECTOR_DIMENSIONS = 768;

export async function getGeminiEmbedding(text:string) {
    try {
        console.log("Generating embedding for text...");
        // Clean input text
        const input = text.replaceAll('\\n', ' ').trim();
        
        // Generating embeddings
        const { embedding } = await embed({
            model: embeddingModel,
            value: input,
        });

        // Verifying dimensions match
        if (embedding.length !== VECTOR_DIMENSIONS) {
            console.warn(`Warning: Generated embedding has ${embedding.length} dimensions, expected ${VECTOR_DIMENSIONS}`);
        }

        return embedding;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}
