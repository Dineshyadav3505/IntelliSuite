// pages/api/conversation.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration } from "openai";

// Initialize OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    // Authenticate the user
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate input parameters
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Missing prompt", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Missing amount", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Missing resolution", { status: 400 });
    }

    // Call OpenAI to create an image
    const response = await openAi.createImage({
      prompt,
      n: parseInt(amount.toString(), 10),
      size: resolution,
    });

    // Return the image data
    return NextResponse.json(response.data.data, { status: 200 });
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}