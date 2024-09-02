import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    console.log("Prompt1", prompt);


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Message is required", { status: 401 });
    }
    console.log("Prompt", prompt);

    const response = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("MUSIC_ERROR", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
