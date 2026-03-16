import type { Metadata } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://parixai.com'),
  title: "parixai — LLM Experiment Runner for Product Teams",
  description: "Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.",
  alternates: {
    canonical: 'https://parixai.com',
  },
  openGraph: {
    title: 'parixai — LLM Experiment Runner for Product Teams',
    description: 'Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.',
    url: 'https://parixai.com',
    siteName: 'parixai',
    images: [
      {
        url: '/assets/hero-illustration.jpg',
        width: 1200,
        height: 630,
        alt: 'parixai LLM experiment runner dashboard',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'parixai — LLM Experiment Runner for Product Teams',
    description: 'Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.',
    images: ['/assets/hero-illustration.jpg'],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "parixai",
    "url": "https://parixai.com",
    "sameAs": ["https://github.com/featurellm/featurellm"],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "parixai",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description": "Open-source LLM experiment runner for product teams. Run the same prompt across GPT-4o, Claude, Gemini, and Llama simultaneously. Track latency, cost, and accuracy. Version prompts. Compare results side-by-side.",
    "url": "https://parixai.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which AI models does parixai support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "parixai supports all major model providers — OpenAI (GPT-4o, GPT-4 Turbo), Anthropic (Claude 3.5, Claude 3), Google (Gemini 1.5 Pro, Flash), Meta (Llama 3), Mistral, and more. New models are added as they become available.",
        },
      },
      {
        "@type": "Question",
        "name": "Do I need to bring my own API keys?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You connect your own provider API keys so all requests go directly from parixai to the model provider. This keeps your usage under your own account and billing.",
        },
      },
      {
        "@type": "Question",
        "name": "How is parixai different from just calling the models directly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calling models directly gives you one result at a time. parixai runs the same prompt across multiple models simultaneously, tracks latency, cost, and accuracy for each run, versions your prompts, and lets you compare results side-by-side — so you can make evidence-based decisions about which model to ship.",
        },
      },
      {
        "@type": "Question",
        "name": "Is my prompt data stored or used for training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your prompts and test data are stored securely to power your experiment history and comparisons. We never use your data to train models, and we never share it with third parties.",
        },
      },
      {
        "@type": "Question",
        "name": "Can I evaluate multiple prompts at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can run a full dataset of inputs through any prompt in a single experiment. Results are aggregated so you see accuracy, latency, and cost across the whole dataset — not just individual samples.",
        },
      },
      {
        "@type": "Question",
        "name": "Is there a free tier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — the Starter plan is free and includes up to 500 evaluations per month, 3 models per experiment, and full access to the dashboard. No credit card required to get started.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "parixai",
    "url": "https://parixai.com",
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
