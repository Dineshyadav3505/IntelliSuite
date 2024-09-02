import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai"; 
import Configuration  from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(req: NextRequest) {
  try {

    const { userId } = auth();
    const body = await req.json();
    const message = body.message;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key is not set", { status: 401 });
    }

    if (!message) {
      return new NextResponse("Message is required", { status: 401 });
    }

    const { prompt, amount = "1", resolution = "512x512" } = body;

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    if (!amount)
      return new NextResponse("Amount is required.", { status: 400 });

    if (!resolution)
      return new NextResponse("Resolution is required.", { status: 400 });

    

      try {
        const response = await openai.images.generate({
          model: "dall-e-3", 
          prompt: prompt,
          n: parseInt(amount, 10),
          size: resolution, 
        });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("[IMAGE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
}