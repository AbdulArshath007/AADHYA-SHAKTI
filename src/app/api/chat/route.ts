import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30; // 30 second timeout for Vercel

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const systemPrompt = "You are the AADHYA SHAKTI AI Assistant. You help women entrepreneurs, mentors, and learners navigate a professional networking hub and government empowerment schemes platform. Be highly professional, empowering, empathetic, and concise. Your color aesthetic aligns with a 'royal heath' palette (deep sophisticated magenta). You can provide guidance on finding mentorship, understanding government schemes like the Mudra Yojana, or optimizing professional profiles.";

    // Use Groq alone with llama-3.1-8b-instant
    const model = groq('llama-3.1-8b-instant');
    const result = await streamText({
      model,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();

  } catch (error: any) {
    console.error("General chat error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate chatbot response" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

