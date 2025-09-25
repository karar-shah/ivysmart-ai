"use client";

import { welcomeMessage } from "@/const/const";
import { useIvyStore } from "@/stores/ivyStore";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import Markdown from "react-markdown";

export default function ChatUI() {
  const { uiState, updateUiState } = useIvyStore();

  const [input, setInput] = useState("");
  const { messages, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/stream-test",
    }),
  });

  const chatDivRef = useRef<HTMLDivElement>(null);

  // use setMessages in useEffect to update the message array with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "1",
        parts: [{ type: "text", text: welcomeMessage }],
        role: "assistant",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatDivRef.current && messages.length > 1) {
      const chatDiv = chatDivRef.current;
      chatDiv.scrollTop = chatDiv.scrollHeight; // Scroll to the bottom of the chat div
    }
  }, [messages]);

  return (
    uiState === "chat" && (
      <div className="h-full flex flex-col animate-fade w-full">
        <p className="text-gray-600 text-center px-6 py-2 rounded-full shadow-md bg-zinc-50 w-fit self-center mt-1 mb-2 flex-shrink-0">
          <b>{"Middle School"}</b> - <b>{"Mathematics"}</b>
        </p>

        <div
          className="flex-grow overflow-y-auto px-4 space-y-4"
          ref={chatDivRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xl w-fit px-4 py-3 rounded-lg mb-2 prose ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-gray-800"
                }`}
              >
                <Markdown>
                  {msg.parts
                    .filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("")}
                </Markdown>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-shrink-0 p-4 pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput("");
            }}
            className="flex justify-center items-center gap-5 shadow-lg p-2 rounded-lg bg-white"
          >
            <input
              className="w-full max-w-md border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button
              type="submit"
              className="p-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <BsSend />
            </button>
          </form>
        </div>
      </div>
    )
  );
}
