import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import replicate from "replicate"; // Ensure you have replicate imported correctly

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth(); // Authenticates the user

    const body = await req.json();
    const { prompt } = body; // Extract the prompt from the request body

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    // Validate the prompt
    if (!prompt) {
      return new NextResponse("Prompt is required.", { status: 400 });
    }

    // Call the Replicate API to generate a response
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    // Return the response as JSON
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[MUSIC_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}