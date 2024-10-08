import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // Use OpenAI directly

export async function POST(req: Request) {
  try {


    const { userId } = auth();
    const body = await req.json();
    const {prompt, amount=1, resolution= "512*512" } = body.message;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      return new NextResponse("OpenAI API Key is not set", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 401 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 401 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 401 });
    } 

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.log("IMAGE_ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}