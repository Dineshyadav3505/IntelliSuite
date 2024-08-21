import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { message } = body;

        // Check for user authentication
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check for API key
        if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
            return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
        }

        // Check for message content
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Create a chat completion request
        const response = await openai.chat.completions.create({
            model: "gpt-4", // Use the appropriate model
            messages: [{ role: "user", content: message }],
        });

        // Return the generated response
        return NextResponse.json(response.choices[0].message);
        
    } catch (error) {
        console.error("CONVERSATION ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}