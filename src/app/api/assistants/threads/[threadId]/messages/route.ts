import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Params = {
  file_ids: string[];
  content: string;
};
// Send a new message to a thread
export async function POST(request: NextRequest, { params }: any) {
  const { threadId } = await params;
  const { content, file_ids }: Params = await request.json();

  console.log("threadId", threadId);
  console.log("file_ids", file_ids);
  try {
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: content,
      ...(file_ids?.[0]
        ? {
            attachments: [
              { file_id: file_ids[0], tools: [{ type: "file_search" }] },
            ],
          }
        : {}),
    });

    // attachments: file_ids.map((file_id) => ({
    //   file_id,
    //   tools: [{ type: "file_search" }],
    // })),
    const stream = openai.beta.threads.runs.stream(threadId, {
      assistant_id: assistantId,
    });
    //   .on("textCreated", () => console.log("assistant >"))
    //   .on("toolCallCreated", (event) => console.log("assistant " + event.type))
    //   .on("messageDone", async (event) => {
    //     if (event.content[0].type === "text") {
    //       const { text } = event.content[0];
    //       const { annotations } = text;
    //       const citations: string[] = [];

    //       let index = 0;
    //       for (let annotation of annotations) {
    //         text.value = text.value.replace(annotation.text, "[" + index + "]");
    //         // @ts-ignore
    //         const { file_citation } = annotation;
    //         if (file_citation) {
    //           const citedFile = await openai.files.retrieve(
    //             file_citation.file_id
    //           );
    //           citations.push("[" + index + "]" + citedFile.filename);
    //         }
    //         index++;
    //       }

    //       console.log(text.value);
    //       console.log(citations.join("\n"));
    //     }
    //   });
    // return new Response(null, { status: 200 });
    return new Response(stream.toReadableStream());
  } catch {
    console.log("error");
    return new Response(null, { status: 500 });
  }
}
