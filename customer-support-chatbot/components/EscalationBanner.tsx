// components/EscalationBanner.tsx
"use client";

interface EscalationData {
  ticketId: string;
  estimatedWait: string;
  suggestedMessage: string;
  urgency: "low" | "medium" | "high";
}

interface EscalationBannerProps {
  data: EscalationData;
}

export function EscalationBanner({ data }: EscalationBannerProps) {
  const urgencyColors = {
    high: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.35)", badge: "#ef4444" },
    medium: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)", badge: "#f59e0b" },
    low: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.35)", badge: "#6366f1" },
  };

  const colors = urgencyColors[data.urgency];

  return (
    <div
      className="escalation-banner"
      style={{ background: colors.bg, borderColor: colors.border }}
    >
      <div className="escalation-header">
        <div className="escalation-icon">👤</div>
        <div>
          <div className="escalation-title">Connecting you to a human agent</div>
          <div className="escalation-ticket">Ticket #{data.ticketId}</div>
        </div>
        <span
          className="escalation-badge"
          style={{ background: colors.badge }}
        >
          {data.urgency} priority
        </span>
      </div>
      <p className="escalation-message">{data.suggestedMessage}</p>
      <div className="escalation-footer">
        <div className="escalation-wait">
          <span className="pulse-dot" style={{ background: colors.badge }} />
          Estimated wait: <strong>{data.estimatedWait}</strong>
        </div>
        <div className="escalation-channels">
          <a href="mailto:support@techflow.io" className="escalation-link">
            📧 Email us
          </a>
          <a href="https://help.techflow.io" target="_blank" rel="noreferrer" className="escalation-link">
            📚 Help Center
          </a>
        </div>
      </div>
    </div>
  );
}
