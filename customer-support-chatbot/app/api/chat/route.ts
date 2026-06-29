// app/api/chat/route.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEACHING MOMENT: This is the heart of the chatbot.
//
// Key concepts:
// 1. streamText() — streams tokens as they're generated (no waiting for full response)
// 2. Tools — functions the AI can choose to call (like "escalate to human")
//    SDK v7: tool({ inputSchema, execute }) instead of tool({ parameters, execute })
// 3. System prompt — defines AI personality and knowledge
// 4. The response is a ReadableStream — the AI SDK handles chunked HTTP transfers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { google } from "@ai-sdk/google";
import { streamText, tool, convertToModelMessages, UIMessage } from "ai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/system-prompt";

// Next.js Edge Runtime — runs closer to users, lower latency for streaming
export const runtime = "edge";

const escalationSchema = z.object({
  reason: z.string().describe("Brief reason for escalation (1-2 sentences)"),
  urgency: z
    .enum(["low", "medium", "high"])
    .describe(
      "Urgency level: 'high' for angry customers or data loss, 'medium' for billing issues, 'low' for general questions"
    ),
  suggestedMessage: z.string().describe("A warm handoff message to show the user"),
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    // TEACHING MOMENT: gemini-2.5-flash is great for chatbots:
    // - Fast response time (low TTFT - Time To First Token)
    // - Strong instruction following
    // - Cost-effective for high-volume support chats
    model: google("gemini-2.5-flash"),

    // The system prompt is injected here — this is how the AI "knows" your FAQ
    system: buildSystemPrompt(),

    // SDK v7: convert UIMessages to model messages format
    messages: await convertToModelMessages(messages),

    // TEACHING MOMENT: Tools are functions the AI can call.
    // Instead of the AI saying "let me transfer you", it actually *calls* a
    // structured function that your UI can react to with custom components.
    // SDK v7 change: use `inputSchema` instead of `parameters`
    tools: {
      escalateToHuman: tool({
        description:
          "Escalate this conversation to a human support agent when the user needs " +
          "human assistance, expresses strong frustration, wants account actions " +
          "(cancellation, refund), or when the question is outside the knowledge base.",
        inputSchema: escalationSchema,
        // execute makes this a "server-side" tool — the AI calls it and gets a result
        execute: async ({ reason, urgency, suggestedMessage }) => {
          // In production: create a support ticket, notify agents via webhook, etc.
          console.log(`[Escalation] Reason: ${reason} | Urgency: ${urgency}`);
          return {
            success: true,
            ticketId: `TF-${Date.now().toString(36).toUpperCase()}`,
            estimatedWait:
              urgency === "high"
                ? "2-5 minutes"
                : urgency === "medium"
                  ? "5-15 minutes"
                  : "15-30 minutes",
            suggestedMessage,
            urgency,
          };
        },
      }),
    },
  });

  // Return the streaming response
  // SDK v7: toUIMessageStreamResponse() is what useChat() in @ai-sdk/react expects
  return result.toUIMessageStreamResponse();
}
