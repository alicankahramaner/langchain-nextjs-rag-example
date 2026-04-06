# Next.js + LangChain Local RAG Agent 🚀

Bu proje, **Ollama** kullanarak tamamen yerel kaynaklarla çalışan, gizlilik odaklı bir **RAG (Retrieval-Augmented Generation)** giriş uygulamasıdır.

## 🛠 Teknik Stack
- **Framework:** Next.js (App Router)
- **AI Orchestration:** LangChain
- **Local LLM:** Ollama (`qwen3:8b`)
- **Embedding:** `nomic-embed-text`
- **Streaming:** Vercel AI SDK (`useChat`)

## 🌟 Özellikler
- ✅ **Tam Gizlilik:** Veriler dış API'ye çıkmadan yerel makinede işlenir.
- 📄 **PDF Desteği:** Yüklenen dokümanlar üzerinden anlamsal sorgulama.
- 🧠 **Memory:** `MemorySaver` ile oturum bazlı konuşma geçmişi.
- ⚡ **Streaming:** Karakter bazlı anlık yanıt akışı.

## 🚀 Hızlı Kurulum

1. **Gerekli Modelleri Çekin:**
```bash
  ollama pull qwen3:8b
  ollama pull nomic-embed-text
```

2. **Projeyi Başlatın:**
Repoyu klonlayın, bağımlılıkları yükleyin ve geliştirme sunucusunu çalıştırın.
```bash
git clone https://github.com/alicankahramaner/langchain-nextjs-rag-example
cd langchain-nextjs-rag-example
npm install
npm run dev
````

3. **Kullanım:**

Tarayıcıda http://localhost:3000 adresini açın. PDF dosyanızı yükledikten sonra asistanla doküman içeriği hakkında anlık olarak konuşmaya başlayabilirsiniz.

## Teknik Detaylar & Rehber

Bu projenin mimari kararlarını, kod bloklarının açıklamasını ve adım adım kurulum rehberini anlattığım Medium yazısına aşağıdan ulaşabilirsiniz:

[Medium](https://medium.com/@alican.kahramaner/langchain-next-js-ile-raga-giri%C5%9F-d7c5c7a89ec2)