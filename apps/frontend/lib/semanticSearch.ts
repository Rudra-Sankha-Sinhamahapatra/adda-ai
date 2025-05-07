import { getGeminiEmbedding } from "./embeddingUtils";
import { supabase } from "./supabaseClient";

export async function semanticSearch(query: string,limit = 5, threshold = 0.7) {
    const queryEmbedding = await getGeminiEmbedding(query);
    const {data,error} = await supabase.rpc("match_messages", {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: limit,
    })

    if (error) {
        console.error("Error during semantic search:", error);
        throw error;
    }

    return data;
    
}