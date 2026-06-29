# TechFlow AI Customer Support Chatbot (Aria) 🤖💬

A next-generation, production-ready AI customer support assistant built using **Next.js App Router (Edge Runtime)**, the **Vercel AI SDK (v7)**, and **Google Gemini 2.5 Flash**. 

Aria acts as a friendly, knowledgeable, and empathetic support specialist for **TechFlow**, a project management SaaS platform. She answers FAQ queries instantly and automatically escalates to a human agent when needed.

---

## Key Features

- ⚡ **Real-Time Streaming**: Uses Next.js Edge Runtime and Gemini 2.5 Flash for blazing-fast Time to First Token (TTFT).
- 🛠️ **Structured Tool Calling**: Aria uses functional tools (`escalateToHuman`) to perform server-side actions when a human agent is needed.
- 👤 **Context-Aware Human Escalation**: Automatically detects when to escalate to a human based on:
  - Explicit customer request ("speak to a human")
  - Account actions requiring human authorization (cancellation, refunds)
  - Escalating customer frustration or urgency
  - Account-specific technical issues or billing problems
  - Out-of-scope inquiries
- 🎟️ **Dynamic Handoff Interface**: Renders a custom ticket card with automated support ticket IDs (`TF-XXXX`) and wait time calculations based on escalation urgency.
- 📚 **FAQ-Grounded System Prompt**: Strictly scoped to a structured company database to guarantee response accuracy and eliminate hallucinations.
- 🎨 **Premium UI/UX**: Includes quick-start suggested questions, real-time typing indicators, auto-scroll, markdown formatting support, and a polished responsive layout.

---

## Technical Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Edge Runtime)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs) (using new SDK v7 patterns like `DefaultChatTransport` and `sendMessage`)
- **LLM Provider**: `@ai-sdk/google` using `gemini-2.5-flash`
- **Validation**: [Zod](https://zod.dev/) (for structured tool schemas)
- **Styling**: Vanilla CSS (highly polished with CSS variables, modern scrollbars, and responsiveness)

---

## File Structure

- [app/api/chat/route.ts](file:///Users/adityakumar/Desktop/ai-projects/customer-support-chatbot/app/api/chat/route.ts): Chat API endpoint handling streaming text generation, tool use configuration, and message formatting.
- [lib/system-prompt.ts](file:///Users/adityakumar/Desktop/ai-projects/customer-support-chatbot/lib/system-prompt.ts): Grounding rules, behavioral constraints, and personality definition for Aria.
- [lib/faq-data.ts](file:///Users/adityakumar/Desktop/ai-projects/customer-support-chatbot/lib/faq-data.ts): Core TechFlow FAQ database containing pricing, features, security, billing, and support details.
- [components/ChatWindow.tsx](file:///Users/adityakumar/Desktop/ai-projects/customer-support-chatbot/components/ChatWindow.tsx): Main chat container managing user sessions, welcome state, auto-scrolling, and typing indicators.
- [components/MessageBubble.tsx](file:///Users/adityakumar/Desktop/ai-projects/customer-support-chatbot/components/MessageBubble.tsx): Renders chat messages and parses markdown. Handles standard message bubbles, tool calls, and tool results (like the escalation card).

---

## Getting Started

### Prerequisites

You need a Google Gemini API Key. Get one for free at [Google AI Studio](https://aistudio.google.com/).

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd customer-support-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

### Running Locally

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

Compile the optimized production bundle:

```bash
npm run build
```
