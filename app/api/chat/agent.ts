import { MemorySaver } from "@langchain/langgraph";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { createRetrieverTool } from "@langchain/classic/tools/retriever";
import { createAgent } from "langchain";

const model = new ChatOllama({
    model: "qwen3:8b",
    baseUrl: "http://localhost:11434",
    streaming: true
});

const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434",
});

export const vectorStore = new MemoryVectorStore(embeddings);

const retrieverTool = createRetrieverTool(vectorStore.asRetriever(), {
    name: 'dokuman_rehberi',
    description: 'Şirket belgeleri, teknik dökümanlar ve yüklenen dosyalar hakkında bilgi aramak için bu aracı kullan.',
});


export const agent = createAgent({
    model,
    tools: [retrieverTool],
    systemPrompt: `Sen bilgili bir asistansın. 
    Sana sorulan sorularla ilgili bilgiyi "dokuman_rehberi" aracını kullanarak ara. 
    Eğer dökümanlarda bilgi bulamazsan bulamadığını belirt. 
    Cevaplarında döküman içeriğini olduğu gibi kopyalama, akıcı bir şekilde anlat.
    Detay istenmediği sürece sadece kısa özetler ver.`,
    checkpointer: new MemorySaver(),
})