import { getNextTopicDetails } from "@/tools";
import { NextRequest, NextResponse } from "next/server";
import { Experimental_Agent as Agent, stepCountIs, validateUIMessages } from "ai";
import { openai } from "@ai-sdk/openai";

const myAgent = new Agent({
  model: openai("gpt-4.1"),
  system:
    "You are a teacher. Use a tool to get the next teaching topic by its index, starting at 0. For each topic, teach all subtopics one by one. After finishing a topic, increment the index and use the tool to get the next topic. Repeat until all topics are taught (tool returns undefined).",
  tools: {
    getNextTopicDetails: getNextTopicDetails,
  },
  stopWhen: stepCountIs(2)
});

export async function POST(req: NextRequest, res: NextResponse) {
  const { messages } = await req.json();
  console.log("API received messages:", JSON.stringify(messages, null, 2));

  console.log("Received messages:", messages);

  return myAgent.respond({
    
    messages: await validateUIMessages({ messages }),
  
  });
}
