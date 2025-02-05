import { middle_school_mathematics } from "@/const/const";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 60;
export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages,
    school_level,
  }: { messages: CoreMessage[]; school_level: string } = await req.json();
  console.log("messages", messages);
  console.log("school_level", school_level);

  let fullPrompt: CoreMessage[] = [
    {
      role: "system",
      content: `You need to act like a teacher and teach student on the provided topics with first explaning theory then example and then give practice question. Follow below instructions for teaching.

      Instruction:
      - The topic is ${middle_school_mathematics[0].topic} and the subtopics are ${middle_school_mathematics[0].topic} and school level is ${school_level}.
      - Start my the 1st subtopic and once fully completed (only after students solves the question correctly then) move to the next subtopic.
      - If student has question asnwer them with examples.
      - If student is unable to solve the question then explain them what they did wrong and how to solve correctly and give some tips.
      - Only move to next subtopic once the student has completed the question for current subtopic.
      
      Formate output in markdown only in below structure:
      Topic: <put topic here>
      Subtopic: <put subtopic here>
      Theory: <put theory here>
      Explanation: <put explanation here>
      Example: <put solved example here>
      Question: <put question here>
      `,
    },
    ...messages,
  ];

  console.log("fullPrompt", fullPrompt);

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      messages: fullPrompt,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error, status: 500, message: error });
  }
}
