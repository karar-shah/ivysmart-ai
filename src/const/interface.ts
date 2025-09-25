import {
  AssistantModelMessage,
  SystemModelMessage,
  ToolModelMessage,
  UserModelMessage,
} from "ai";

export type Message = {
  role: "user" | "assistant";
  content: string;
};
export interface ChatProps {
  messages: Message[];
}

export type ModelMessages = Array<
  | SystemModelMessage
  | UserModelMessage
  | AssistantModelMessage
  | ToolModelMessage
>;
