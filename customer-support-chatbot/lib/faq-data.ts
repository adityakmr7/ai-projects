// lib/faq-data.ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TEACHING MOMENT: This is a simplified version of "RAG" (Retrieval-Augmented
// Generation). In production, you'd store this in a vector database (Pinecone,
// Supabase pgvector) and do semantic similarity search. For a focused chatbot,
// injecting the entire FAQ into the system prompt works great.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export const COMPANY_NAME = "TechFlow";
export const COMPANY_DESCRIPTION =
  "TechFlow is a project management SaaS platform for software teams.";

export const faqData: FAQItem[] = [
  // ── PRICING ──────────────────────────────────────────────────────────────
  {
    category: "Pricing",
    question: "What are your pricing plans?",
    answer:
      "TechFlow offers three plans: Starter ($9/month, up to 3 users, 5 projects), Pro ($29/month, up to 20 users, unlimited projects, priority support), and Enterprise (custom pricing, unlimited users, dedicated support, SSO, and audit logs). All plans include a 14-day free trial with no credit card required.",
  },
  {
    category: "Pricing",
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes! Annual billing saves you 20% compared to monthly. Starter annual is $86/year (saves $22), Pro annual is $278/year (saves $70). Enterprise plans always include custom pricing with further discounts available.",
  },
  {
    category: "Pricing",
    question: "Is there a free plan?",
    answer:
      "We don't offer a permanent free plan, but every account starts with a 14-day free trial that includes all Pro features. No credit card is required to start. After the trial, you can choose any paid plan.",
  },
  {
    category: "Pricing",
    question: "Can I change plans anytime?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time from your Account Settings > Billing page. Upgrades take effect immediately (prorated billing), and downgrades take effect at the end of your current billing cycle.",
  },

  // ── FEATURES ──────────────────────────────────────────────────────────────
  {
    category: "Features",
    question: "What project management features are included?",
    answer:
      "TechFlow includes: Kanban boards, Gantt charts, Sprint planning, Task dependencies, Time tracking, File attachments (up to 25MB each), Comments and @mentions, Custom fields, Automations (Pro+), Reporting dashboards, and Integrations with GitHub, Slack, Figma, and Google Drive.",
  },
  {
    category: "Features",
    question: "Does TechFlow integrate with GitHub?",
    answer:
      "Yes! Our GitHub integration (available on all plans) lets you link pull requests to tasks, automatically move tasks when PRs are merged, and see commit history inside TechFlow. To set it up, go to Settings > Integrations > GitHub.",
  },
  {
    category: "Features",
    question: "Is there a mobile app?",
    answer:
      "Yes, TechFlow has native iOS and Android apps available for free on the App Store and Google Play Store. The mobile apps support full task management, notifications, time tracking, and file uploads.",
  },
  {
    category: "Features",
    question: "Does TechFlow support time tracking?",
    answer:
      "Yes, built-in time tracking is available on all plans. You can start/stop a timer on any task, manually log hours, view time reports by project or team member, and export data as CSV. Pro and Enterprise plans also support billable hours and client invoicing.",
  },

  // ── ACCOUNT & SECURITY ────────────────────────────────────────────────────
  {
    category: "Account & Security",
    question: "How do I reset my password?",
    answer:
      "Go to the TechFlow login page, click 'Forgot password?', enter your email, and you'll receive a reset link within 2 minutes. The link expires after 1 hour. If you don't receive it, check your spam folder or contact support.",
  },
  {
    category: "Account & Security",
    question: "Is my data secure?",
    answer:
      "TechFlow is SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We perform daily backups with 30-day retention. Our infrastructure runs on AWS with 99.9% uptime SLA. Two-factor authentication (2FA) is available and recommended.",
  },
  {
    category: "Account & Security",
    question: "How do I enable two-factor authentication?",
    answer:
      "Go to Account Settings > Security > Two-Factor Authentication, click 'Enable 2FA', and scan the QR code with an authenticator app (Google Authenticator, Authy, etc.). Save your backup codes in a secure place. 2FA can also be enforced organization-wide by admins in Enterprise plans.",
  },
  {
    category: "Account & Security",
    question: "Can I export my data?",
    answer:
      "Yes, you can export all your data at any time. Go to Account Settings > Data Export. You can export projects as CSV or JSON. For full data exports, Enterprise customers can request a complete data dump. We also support data export via our REST API.",
  },

  // ── BILLING ───────────────────────────────────────────────────────────────
  {
    category: "Billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) via Stripe. Enterprise customers can also pay via bank transfer (ACH/wire) with NET-30 invoicing. We don't accept PayPal or cryptocurrency.",
  },
  {
    category: "Billing",
    question: "How do I get a refund?",
    answer:
      "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact support and we'll issue a full refund, no questions asked. After 30 days, we don't offer refunds for partial billing periods, but you can cancel anytime to stop future charges.",
  },
  {
    category: "Billing",
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from Account Settings > Billing > Cancel Subscription. Your account remains active until the end of the current billing period. We don't charge cancellation fees. You'll receive a confirmation email, and your data is retained for 90 days after cancellation in case you'd like to reactivate.",
  },

  // ── SUPPORT ───────────────────────────────────────────────────────────────
  {
    category: "Support",
    question: "How do I contact support?",
    answer:
      "You can reach support via: (1) Live chat — available in-app and here, Mon-Fri 9am-6pm EST, (2) Email at support@techflow.io with 24-hour response time, (3) Help Center at help.techflow.io with 200+ articles. Pro and Enterprise customers get priority support with 4-hour SLA.",
  },
  {
    category: "Support",
    question: "What are your support hours?",
    answer:
      "Our support team is available Monday through Friday, 9am to 6pm Eastern Time. We're closed on US federal holidays. Enterprise customers with 24/7 SLA can reach on-call support at any time. Our Help Center is always available at help.techflow.io.",
  },
  {
    category: "Support",
    question: "Do you have a status page?",
    answer:
      "Yes! Check real-time system status and subscribe to incident notifications at status.techflow.io. You can subscribe to updates via email or RSS. Historical uptime data is also available there.",
  },
];

/**
 * Formats the FAQ data into a clean text block for the system prompt.
 * This is the "knowledge injection" step.
 */
export function formatFAQForPrompt(): string {
  const grouped = faqData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return Object.entries(grouped)
    .map(([category, items]) => {
      const qas = items
        .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
        .join("\n\n");
      return `## ${category}\n${qas}`;
    })
    .join("\n\n---\n\n");
}
