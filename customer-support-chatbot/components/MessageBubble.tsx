// components/MessageBubble.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEACHING MOMENT: In SDK v7, messages are UIMessage objects.
// Tool results live in message.parts[] with type "tool-invocation".
// We inspect these to render custom UI (the EscalationBanner).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"use client";

import { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { EscalationBanner } from "./EscalationBanner";

interface MessageBubbleProps {
  message: UIMessage;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  // In SDK v7, find tool-invocation parts in the message parts array
  const escalationPart = message.parts?.find(
    (part) =>
      part.type === "tool-invocation" &&
      (part as { toolName?: string }).toolName === "escalateToHuman" &&
      (part as { state?: string }).state === "output"
  ) as
    | {
        type: "tool-invocation";
        toolName: string;
        state: string;
        output: {
          ticketId: string;
          estimatedWait: string;
          suggestedMessage: string;
          urgency: "low" | "medium" | "high";
        };
        input: { urgency: "low" | "medium" | "high" };
      }
    | undefined;

  // Get the text content from message parts (SDK v7 uses parts[] not .content)
  const textContent = message.parts
    ?.filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("") ?? "";

  return (
    <div className={`message-row ${isUser ? "message-row--user" : "message-row--assistant"}`}>
      {!isUser && (
        <div className="avatar avatar--aria" aria-label="Aria support agent">
          <span>A</span>
          <div className="avatar-status" />
        </div>
      )}

      <div className={`bubble ${isUser ? "bubble--user" : "bubble--assistant"}`}>
        {isUser ? (
          <p className="bubble-text">{textContent}</p>
        ) : (
          <>
            {textContent && (
              <div className="bubble-markdown">
                <ReactMarkdown>{textContent}</ReactMarkdown>
                {isStreaming && <span className="streaming-cursor" aria-hidden="true" />}
              </div>
            )}

            {escalationPart?.output && (
              <EscalationBanner
                data={{
                  ticketId: escalationPart.output.ticketId,
                  estimatedWait: escalationPart.output.estimatedWait,
                  suggestedMessage: escalationPart.output.suggestedMessage,
                  urgency: escalationPart.output.urgency || escalationPart.input?.urgency || "medium",
                }}
              />
            )}
          </>
        )}
      </div>

      {isUser && (
        <div className="avatar avatar--user" aria-label="You">
          <span>U</span>
        </div>
      )}
    </div>
  );
}
