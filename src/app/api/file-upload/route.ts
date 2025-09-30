import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: Request) {
  try {
    const formData = await request.formData(); // process file as FormData
    const file = formData.get("file"); // retrieve the single file from FormData
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID; // get or create vector store

    const openaiFile = await openai.files.create({
      file: file as any,
      purpose: "user_data",
      expires_after: {
        anchor: "created_at",
        seconds: 2592000,
      },
    });
    console.log("File uploaded:", openaiFile);

    // add file to vector store
    const myVectorStoreFile = await openai.vectorStores.files.create(
      process.env.OPENAI_VECTOR_STORE_ID!,
      {
        file_id: openaiFile.id,
      }
    );
    console.log("File added to vector store:", myVectorStoreFile);

    return NextResponse.json({
      success: true,
      result: {
        file_id: openaiFile.id,
        vector_store_file_id: myVectorStoreFile.id,
      },
    });
  } catch (err) {
    console.log("Error in file upload:", err);
    return NextResponse.json(
      { success: false, error: "File upload failed" },
      { status: 500 }
    );
  }
}
