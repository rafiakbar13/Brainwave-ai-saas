import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount are required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial limit reached", { status: 403 });
    }

    // const response = await openai.createImage({
    //   prompt,
    //   n: parseInt(amount, 10),
    //   size: resolution,
    // });

    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
          num_outputs: parseInt(amount, 10),
          output_resolution: resolution,
        },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log("[Image_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
