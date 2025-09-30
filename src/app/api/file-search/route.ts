import { getNextTopicDetails } from "@/tools";
import { NextRequest, NextResponse } from "next/server";
import {
  Experimental_Agent as Agent,
  convertToModelMessages,
  stepCountIs,
  UIMessage,
  validateUIMessages,
} from "ai";
import { openai } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;
export const runtime = "edge";

const myAgent = new Agent({
  model: openai("gpt-4.1"),
  system: `You need to act like a teacher and teach student on the provided topics in the attached file, first explaning theory then example and then give practice question. Follow below instructions for teaching.

Use a file search tool to get topic details from the attached file. For each topic, teach all subtopics one by one. After finishing a topic use the tool to get the next topic from the attachment. Repeat until all topics are taught.

      Instruction:
      - The topic is <topic> and the subtopics are <subtopics> .
      - Start my the 1st subtopic, answer any user query or question asked about the attachment file and once fully completed (only after students solves the question correctly then) move to the next subtopic.
      - If student has question asnwer them with examples.
      - If student is unable to solve the question then explain them what they did wrong and how to solve correctly and give some tips.
      - Only move to next subtopic once the student has completed the question for current subtopic.
      
      Formate output in markdown styling and use below structure referance:
      Topic: <put topic here>
      Subtopic: <put subtopic here>
      Theory: <put theory here>
      Explanation: <put explanation here>
      Example: <put solved example here>
      Question: <put question here>`,
  tools: {
    getNextTopicDetails: getNextTopicDetails,
    file_search: openai.tools.fileSearch({
      vectorStoreIds: ["vs_68da8af41f6c819187aebf755aa2e087"],
      maxNumResults: 3,
    }),
  },
  stopWhen: stepCountIs(2),
});

export async function POST(req: Request) {
  const { messages, body }: { messages: UIMessage[]; body: any } =
    await req.json();
  console.log("Body received:", body);
  console.log("messages received:", messages);
  // console.log("API received messages:", JSON.stringify(messages, null, 2));

  // console.log("Received messages:", messages);

  const result = myAgent.stream({
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
