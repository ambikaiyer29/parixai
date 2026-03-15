import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "parixai — LLM Experiment Runner for Product Teams",
  description: "Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
