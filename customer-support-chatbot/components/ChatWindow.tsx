// components/ChatWindow.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEACHING MOMENT: Vercel AI SDK v7 changed the useChat() API.
//
// v7 pattern:
//   - Import useChat from "@ai-sdk/react"
//   - Pass transport: new DefaultChatTransport({ api }) for HTTP
//   - Use sendMessage({ text }) to send messages (no handleSubmit form)
//   - messages is UIMessage[] with .parts[] for structured content
//   - status can be: "ready" | "submitted" | "streaming" | "error"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

const SUGGESTED_QUESTIONS = [
  "What are your pricing plans?",
  "Do you have a mobile app?",
  "How do I reset my password?",
  "What integrations do you support?",
];

export function ChatWindow() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await sendMessage({ text });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSuggestedQuestion = async (question: string) => {
    if (isLoading) return;
    await sendMessage({ text: question });
  };

  const lastMessage = messages[messages.length - 1];
  const isStreamingLastMessage =
    status === "streaming" && lastMessage?.role === "assistant";

  return (
    <div className="chat-window" role="main" aria-label="Customer support chat">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="agent-info">
          <div className="agent-avatar">
            <span>A</span>
            <div className="online-indicator" aria-label="Online" />
          </div>
          <div>
            <h2 className="agent-name">Aria</h2>
            <p className="agent-status">
              <span className="status-dot" aria-hidden="true" />
              TechFlow Support · Online
            </p>
          </div>
        </div>
        <div className="header-actions">
          <div className="security-badge" title="Encrypted conversation">
            🔒
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className="messages-area"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {/* Welcome State */}
        {messages.length === 0 && (
          <div className="welcome-state">
            <div className="welcome-avatar">
              <span>A</span>
              <div className="online-indicator" />
            </div>
            <h3 className="welcome-title">Hi! I&apos;m Aria 👋</h3>
            <p className="welcome-subtitle">
              I&apos;m here to help with any questions about TechFlow. What can I assist you with today?
            </p>

            <div className="suggested-questions" aria-label="Suggested questions">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className="suggested-question-btn"
                  onClick={() => handleSuggestedQuestion(q)}
                  aria-label={`Ask: ${q}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message List */}
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isStreaming={
              isStreamingLastMessage && index === messages.length - 1
            }
          />
        ))}

        {/* Typing Indicator (shown while waiting for first token) */}
        {status === "submitted" && (
          <div className="message-row message-row--assistant" aria-live="polite" aria-label="Aria is typing">
            <div className="avatar avatar--aria">
              <span>A</span>
              <div className="avatar-status" />
            </div>
            <div className="bubble bubble--assistant bubble--typing">
              <div className="typing-dots" aria-hidden="true">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-message" role="alert">
            <span>⚠️</span>
            <p>Something went wrong. Please check your API key and try again.</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
