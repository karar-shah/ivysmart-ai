export type Message = {
  role: "user" | "assistant";
  content: string;
};
export interface ChatProps {
  messages: Message[];
}
