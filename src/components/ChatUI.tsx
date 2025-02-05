"use client";

import { welcomeMessage } from "@/const/const";
import { useIvyStore } from "@/stores/ivyStore";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { BsSend } from "react-icons/bs";
import Markdown from "react-markdown";

export default function ChatUI() {
  const { uiState, updateUiState } = useIvyStore();

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
      body: { school_level: "6-8 (Middle School)" },
    });

  const chatDivRef = useRef<HTMLDivElement>(null);
  console.log("messages", messages);

  // use setMessages in useEffect to update the message arry with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: welcomeMessage,
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
      <div className="animate-fade flex flex-col w-full p-4 pb-0 pt-1 space-y-4 overflow-y-auto h-full">
        <p className="text-gray-600 text-center px-6 py-2 rounded-full shadow-md bg-zinc-50 w-fit self-center">
          <b>{"Middle School"}</b> - <b>{"Mathematics"}</b>
        </p>
        <div className="md:pb-12 max-h-96 overflow-y-auto" ref={chatDivRef}>
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
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          ))}
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="md:fixed bottom-0 left-0 right-0 flex justify-center items-center gap-5 md:px-4 shadow-xl pb-9 h-fit bg-opacity-70 "
          >
            <input
              className="w-full max-w-md border border-zinc-300 rounded-lg shadow-lg px-4 py-3 "
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="p-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-full "
            >
              <BsSend />
            </button>
          </form>
        </div>
      </div>
    )
  );
}
