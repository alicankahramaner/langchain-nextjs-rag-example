
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { NextRequest, NextResponse } from "next/server";
import { agent, vectorStore } from "./agent";
import { createUIMessageStreamResponse, UIMessage } from "ai";
import { toBaseMessages, toUIMessageStream } from "@ai-sdk/langchain";

export async function POST(req: NextRequest) {
    const { messages, id }: { messages: UIMessage[], id: string } = await req.json();

    const langchainMessages = await toBaseMessages(messages);

    const stream = await agent.stream({ messages: langchainMessages }, {
        streamMode: ["values", 'messages', 'updates'],
        configurable: {
            thread_id: id
        }
    });

    return createUIMessageStreamResponse({
        stream: toUIMessageStream(stream),
    });

}

export async function PUT(req: NextRequest) {

    const formData = await req.formData();

    const file: File = formData.get("file") as File;
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    try {

        const loader = new PDFLoader(new Blob([buffer]))
        const loadedDocument = await loader.load()

        vectorStore.addDocuments(loadedDocument)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ success: false, error: error }, { status: 500 })
    }

}