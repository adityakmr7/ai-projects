// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechFlow Support | AI Customer Help",
  description:
    "Get instant answers to your TechFlow questions. Our AI support agent Aria is available 24/7 to help with pricing, features, billing, and account management.",
  keywords: ["TechFlow", "customer support", "AI chatbot", "help center"],
  openGraph: {
    title: "TechFlow AI Support",
    description: "Instant answers powered by AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
