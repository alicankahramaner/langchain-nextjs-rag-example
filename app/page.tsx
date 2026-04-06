'use client';
import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { DocumentUploadDrawer } from "@/components/document-upload-drawer";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    id: 'langchain-nextjs-rag-example'
  });

  const isLoading = status === "submitted";

  return (
    <div className="flex flex-col h-screen max-w-6/12 m-auto">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Type a message below to begin"
            />
          ) : (
            messages.filter(message => message.role !== 'system').map((message) => (
              <Message
                key={message.id}
                from={message.role}
              >
                <MessageContent>
                  {message.role === "assistant" ? (
                    <MessageResponse>
                      {message.parts
                        ?.filter((part) => part.type === "text")
                        .map((part) => part.text)
                        .join("") || "..."}
                    </MessageResponse>
                  ) : (
                    <>
                      {message.parts?.map(
                        (part) => part.type === "text" && part.text,
                      )}
                    </>
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {
            isLoading && <Message className="animate-bounce" from={"assistant"}>
              <MessageContent>
                <MessageResponse animated={{ animation: 'slideUp', duration: 0.5, sep: 'char', stagger: 2, easing: 'ease' }} isAnimating>
                  ...
                </MessageResponse>
              </MessageContent>
            </Message>
          }
        </ConversationContent>
      </Conversation>

      <div className="border-t p-4">
        <PromptInput
          onSubmit={(message) => {
            if (message.text.length) {
              sendMessage({ text: message.text });
              setInput("");
            }
          }}
          className="max-w-3xl mx-auto flex gap-2 items-end"
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            placeholder="Type your message..."
            disabled={isLoading}
            rows={1}
          />
          <PromptInputFooter>
            <DocumentUploadDrawer />
            <PromptInputSubmit disabled={isLoading || input.length === 0} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
