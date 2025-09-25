// import { tool } from "@openai/agents";
import { tool } from "ai";
import { z } from "zod";
import { middle_school_mathematics } from "./const/const";

// Function to get the next topic based on the provided index
export function get_next_topic(topic_index: number) {
  return middle_school_mathematics[topic_index];
}

//// Tool definition for integration with OpenAI agents

// This tool retrieves the next topic of teaching for a student based on the current topic index.
export const getNextTopicDetails = tool({
  name: "get_next_topic_details",
  description: "Get the next topic of teaching for a student.",
  inputSchema: z.object({
    current_topic_index: z
      .number()
      .describe("Array index of the topic dictionary/object to return."),
  }),
  async execute({ current_topic_index }) {
    return get_next_topic(current_topic_index);
  },
});
