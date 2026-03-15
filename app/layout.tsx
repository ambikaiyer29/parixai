import type { Metadata } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "parixai — LLM Experiment Runner for Product Teams",
  description: "Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DDSL5DZZ28"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DDSL5DZZ28');
          `}
        </Script>
      </head>
      <body>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
