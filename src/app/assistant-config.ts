export let assistantId: string;

if (process.env.OPENAI_ASSISTANT_ID) {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
} else {
  assistantId = "";
}
