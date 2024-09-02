import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // Use OpenAI directly

export async function POST(req: Request) {
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

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("CONVERSATION_ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}