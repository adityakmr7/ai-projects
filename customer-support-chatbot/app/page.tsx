// app/page.tsx
import { ChatWindow } from "@/components/ChatWindow";

export default function HomePage() {
  return (
    <div className="page-wrapper">
      {/* Hero Header */}
      <header className="page-header">
        <div className="brand-badge">
          ✦ AI-Powered Support
        </div>
        <h1 className="page-title">
          Talk to <span className="gradient-text">Aria</span>,<br />
          your support expert
        </h1>
        <p className="page-subtitle">
          Instant answers about TechFlow pricing, features, billing, and more —
          available 24/7, escalates to humans when needed.
        </p>
      </header>

      {/* Main Chat Interface */}
      <ChatWindow />

      {/* Footer Feature Pills */}
      <footer className="page-footer">
        <div className="feature-pills">
          <span className="pill">⚡ Streaming responses</span>
          <span className="pill">🤖 Gemini 2.0 Flash</span>
          <span className="pill">👤 Human escalation</span>
          <span className="pill">🔒 Encrypted</span>
          <span className="pill">🌐 Edge runtime</span>
        </div>
      </footer>
    </div>
  );
}
