"use client";

import { welcomeMessage } from "@/const/const";
import { useIvyStore } from "@/stores/ivyStore";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useMemo, use } from "react";
import { createPortal } from "react-dom";
import { BsSend } from "react-icons/bs";
import Markdown from "react-markdown";
import { PiSpinnerGapLight } from "react-icons/pi";
import { IoMdAttach } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { MemoizedMarkdown } from "./MemorizedMarkdown";

export default function ChatUI() {
  const {
    uiState,
    updateUiState,
    uploadedFiles,
    addUploadedFile,
    removeUploadedFile,
    updateUploadedFile,
    getUploadedFiles,
  } = useIvyStore();
  const [input, setInput] = useState("");

  // Dynamic transport based on whether files are uploaded - use useMemo to recalculate when uploadedFiles changes

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/stream-test", // default
      prepareSendMessagesRequest: ({
        messages,
        trigger,
        messageId,
        requestMetadata,
        api,
      }) => {
        const currentFiles = getUploadedFiles();
        const useFileApi = currentFiles.length > 0;
        console.log(
          "api",
          api,
          currentFiles.length > 0,
          "updated api:",
          currentFiles.length > 0 ? "/api/file-search" : "/api/stream-test",
          "uploadedFiles:",
          currentFiles
        );
        return {
          api:
            currentFiles.length > 0 ? "/api/file-search" : "/api/stream-test",
          body: {
            messages,
            // you could also send your uploadedFiles info here
            files:
              currentFiles.length > 0
                ? currentFiles.map((f) => f.id)
                : undefined,
          },
        };
      },
    }),
  });

  const chatDivRef = useRef<HTMLDivElement>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const attachBtnRef = useRef<HTMLButtonElement>(null);
  const [modalPos, setModalPos] = useState<{
    top: number;
    left: number;
    width: number;
    isMobile: boolean;
  } | null>(null);

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
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Show modal above attachment button, responsive for mobile/desktop
  useEffect(() => {
    if (showUpload && attachBtnRef.current) {
      const rect = attachBtnRef.current.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const modalWidth = winWidth < 500 ? winWidth - 32 : 340;
      const isMobile = winWidth < 500;
      let left = rect.left;
      if (isMobile) {
        left = (winWidth - modalWidth) / 2;
      }
      setModalPos({
        top: rect.top - 270, // modal height + margin
        left,
        width: modalWidth,
        isMobile,
      });
    }
  }, [showUpload]);

  const handleFileUpload = async () => {
    if (!selectedFile || isUploading) return;

    const tempId = Date.now().toString(); // temporary ID for uploading file
    const fileName = selectedFile.name;

    // Close popup immediately and add file with uploading state
    setShowUpload(false);
    addUploadedFile({ name: fileName, id: tempId, isUploading: true });
    setSelectedFile(null);
    setIsUploading(true);

    try {
      const data = new FormData();
      data.append("file", selectedFile);
      const res = await fetch("/api/file-upload", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        const result = await res.json();
        // expects { success: true, result: { file_id, ... } }
        if (result.success && result.result?.file_id) {
          // Update the file with real ID and remove uploading state
          updateUploadedFile(tempId, {
            id: result.result.file_id,
            isUploading: false,
          });
        } else {
          // Remove failed upload
          removeUploadedFile(tempId);
        }
      } else {
        // Remove failed upload
        removeUploadedFile(tempId);
      }
    } catch (error) {
      // Remove failed upload
      removeUploadedFile(tempId);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    uiState === "chat" && (
      <div className="h-full flex flex-col animate-fade w-full">
        <p className="text-gray-600 text-center px-6 py-2 rounded-full shadow-md bg-zinc-50 w-fit self-center mt-1 mb-2 shrink-0">
          <b>{"Middle School"}</b> - <b>{"Mathematics"}</b>
        </p>

        <div
          className="grow overflow-y-auto px-4 space-y-4"
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
                {msg.parts.map((part) => {
                  if (part.type === "text") {
                    return (
                      <MemoizedMarkdown
                        key={`${msg.id}-text`}
                        id={msg.id}
                        content={part.text}
                      />
                    );
                  }
                })}
              </div>
            </div>
          ))}
          {status === "submitted" && (
            <div className="flex justify-center">
              <PiSpinnerGapLight className="animate-spin" />
            </div>
          )}
        </div>
        <div
          className={`shrink-0 p-4 pt-2 ${
            uploadedFiles.length > 0 ? "pb-6" : ""
          }`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput("");
            }}
            className={`flex flex-col gap-2 shadow-lg p-2 rounded-lg bg-white ${
              uploadedFiles.length > 0 ? "min-h-[110px]" : ""
            }`}
          >
            <div className="flex flex-col w-full max-w-full lg:max-w-[600px] border border-zinc-300 rounded-lg bg-white px-2 py-2 mx-auto">
              {uploadedFiles.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-1">
                  {uploadedFiles.map((file, idx) => (
                    <span
                      key={file.id}
                      className="flex items-center bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium border border-emerald-100 truncate max-w-[120px]"
                    >
                      <span className="truncate max-w-[90px]">{file.name}</span>
                      {file.isUploading ? (
                        <PiSpinnerGapLight
                          className="ml-1 animate-spin text-emerald-600"
                          size={12}
                        />
                      ) : (
                        <button
                          type="button"
                          className="ml-1 text-emerald-400 hover:text-emerald-700 p-0.5"
                          aria-label="Remove file"
                          onClick={() => removeUploadedFile(file.id)}
                        >
                          <RxCross2 size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center w-full">
                <button
                  type="button"
                  className="p-2 rounded-full transition bg-transparent hover:bg-emerald-600/20 focus:outline-none disabled:opacity-50"
                  tabIndex={-1}
                  aria-label="Attach"
                  onClick={() => setShowUpload(true)}
                  ref={attachBtnRef}
                  disabled={status === "submitted" || isUploading}
                >
                  <IoMdAttach size={25} className="text-zinc-500" />
                </button>
                <input
                  className="flex-1 border-none bg-transparent px-2 py-2 focus:outline-none"
                  value={input}
                  placeholder="Say something..."
                  onChange={(e) => setInput(e.currentTarget.value)}
                />
                <button
                  type="submit"
                  className="p-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    status === "submitted" ||
                    isUploading ||
                    !input.trim() ||
                    uploadedFiles.some((f) => f.isUploading)
                  }
                >
                  {status === "submitted" ? (
                    <PiSpinnerGapLight className="animate-spin" size={20} />
                  ) : (
                    <BsSend />
                  )}
                </button>
                {/* You can use uploadedFiles.map(f => f.id) when sending a message */}
              </div>
            </div>
          </form>
        </div>
        {/* Responsive File Upload Modal - positioned above attachment button */}
        {showUpload &&
          modalPos &&
          createPortal(
            <div
              style={{
                position: "absolute",
                top: modalPos.top,
                left: modalPos.left,
                width: modalPos.width,
                zIndex: 100,
                transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
              }}
              className={`bg-white rounded-2xl shadow-2xl p-5 sm:p-6 relative flex flex-col items-center border border-zinc-100 ${
                modalPos.isMobile ? "w-full max-w-[95vw]" : "w-[340px]"
              }`}
            >
              <button
                className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-xl"
                onClick={() => {
                  setShowUpload(false);
                  setSelectedFile(null);
                }}
                aria-label="Close"
              >
                <CgClose />
              </button>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer group w-full"
              >
                <div className="bg-emerald-50 rounded-full p-4 mb-2 border border-zinc-200 group-hover:bg-emerald-100 transition">
                  <IoMdAttach
                    size={36}
                    className="text-emerald-600 group-hover:text-emerald-700"
                  />
                </div>
                <span className="text-s text-zinc-500 mb-2">Attach a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.pptx,.txt,.jpg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && (
                <div className="mt-2 text-sm text-zinc-700 text-center w-full truncate">
                  {selectedFile.name}
                </div>
              )}
              <button
                className="mt-4 w-full py-3 bg-emerald-600 text-white rounded-full font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed text-base"
                onClick={handleFileUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <PiSpinnerGapLight className="animate-spin" size={16} />
                    Uploading...
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
              <p className="mt-3 text-[11px] text-zinc-400 text-center">
                PDF, DOC, DOCX, PPTX, TXT, JPG, PNG
              </p>
            </div>,
            document.body
          )}
      </div>
    )
  );
}
