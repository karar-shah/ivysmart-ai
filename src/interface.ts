export type Subject =
  | "math"
  | "science"
  | "history"
  | "literature"
  | "language"
  | "other";

export type EducationLevel =
  | "kindergarten"
  | "elementary"
  | "middle"
  | "high"
  | "undergraduate"
  | "graduate";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface User {
  id: string;
  email: string;
}
