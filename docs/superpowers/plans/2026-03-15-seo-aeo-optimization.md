# SEO & AEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Open Graph tags, sitemap, canonical URLs, and JSON-LD structured data to maximize parixai's visibility on Google search and AI answer engines (Perplexity, ChatGPT, Google AI Overviews).

**Architecture:** All changes are purely additive metadata — no component logic changes. The root layout gets `metadataBase` + OG/Twitter fields + a JSON-LD `<script>` block. A new `app/sitemap.ts` file uses the Next.js App Router sitemap convention. Per-page metadata in login/signup gets OG + canonical additions. `robots.txt` gets a `Sitemap:` directive.

**Tech Stack:** Next.js 14 App Router, TypeScript. No new dependencies required.

**Spec:** `docs/superpowers/specs/2026-03-15-seo-aeo-optimization-design.md`

---

## Chunk 1: Foundation — metadataBase, OG, Twitter, canonicals

### Task 1: Add metadataBase + OG + Twitter to root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the metadata export in `app/layout.tsx`**

Replace the existing `metadata` export with:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://parixai.ai'),
  title: "parixai — LLM Experiment Runner for Product Teams",
  description: "Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.",
  alternates: {
    canonical: 'https://parixai.ai',
  },
  openGraph: {
    title: 'parixai — LLM Experiment Runner for Product Teams',
    description: 'Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.',
    url: 'https://parixai.ai',
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
```

- [ ] **Step 2: Verify OG image exists**

Run: `ls -lh public/assets/hero-illustration.jpg`

Expected: file exists. If it doesn't, stop and check `public/assets/` for the correct filename.

- [ ] **Step 3: Run build to confirm no type errors**

Run: `npm run build 2>&1 | tail -20`

Expected: `✓ Compiled successfully` with no type errors.

---

### Task 2: Add OG + Twitter + canonical to login page

**Files:**
- Modify: `app/login/page.tsx`

- [ ] **Step 1: Update the metadata export in `app/login/page.tsx`**

Replace the existing `metadata` export with:

```ts
export const metadata: Metadata = {
  title: "Log In — parixai",
  description: "Log in to your parixai account.",
  alternates: {
    canonical: 'https://parixai.ai/login',
  },
  openGraph: {
    title: 'Log In — parixai',
    description: 'Log in to your parixai account.',
    url: 'https://parixai.ai/login',
    siteName: 'parixai',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Log In — parixai',
    description: 'Log in to your parixai account.',
  },
};
```

- [ ] **Step 2: Run build to confirm no type errors**

Run: `npm run build 2>&1 | tail -20`

Expected: `✓ Compiled successfully`

---

### Task 3: Add OG + Twitter + canonical to signup page

**Files:**
- Modify: `app/signup/page.tsx`

- [ ] **Step 1: Update the metadata export in `app/signup/page.tsx`**

Replace the existing `metadata` export with:

```ts
export const metadata: Metadata = {
  title: "Sign Up — parixai",
  description: "Join the parixai waitlist for early cloud access.",
  alternates: {
    canonical: 'https://parixai.ai/signup',
  },
  openGraph: {
    title: 'Sign Up — parixai',
    description: 'Join the parixai waitlist for early cloud access.',
    url: 'https://parixai.ai/signup',
    siteName: 'parixai',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sign Up — parixai',
    description: 'Join the parixai waitlist for early cloud access.',
  },
};
```

- [ ] **Step 2: Run build to confirm no type errors**

Run: `npm run build 2>&1 | tail -20`

Expected: `✓ Compiled successfully`

---

### Task 4: Commit Chunk 1

- [ ] **Step 1: Commit**

```bash
git add app/layout.tsx app/login/page.tsx app/signup/page.tsx
git commit -m "feat: add OG tags, Twitter cards, and canonical URLs"
```

---

## Chunk 2: Sitemap + robots.txt

### Task 5: Add sitemap.ts

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://parixai.ai',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://parixai.ai/signup',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://parixai.ai/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
```

- [ ] **Step 2: Run build and verify sitemap is generated**

Run: `npm run build 2>&1 | tail -20`

Expected: `✓ Compiled successfully`. After build, check `.next/server/app/sitemap.xml/` exists or verify by running `npm run start` and visiting `http://localhost:3000/sitemap.xml`.

---

### Task 6: Add Sitemap directive to robots.txt

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Append Sitemap directive**

Add the following line to the end of `public/robots.txt`:

```
Sitemap: https://parixai.ai/sitemap.xml
```

Final file should look like:
```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://parixai.ai/sitemap.xml
```

---

### Task 7: Commit Chunk 2

- [ ] **Step 1: Commit**

```bash
git add app/sitemap.ts public/robots.txt
git commit -m "feat: add sitemap.xml and robots.txt Sitemap directive"
```

---

## Chunk 3: JSON-LD Structured Data

### Task 8: Add JSON-LD to root layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add JSON-LD `<script>` block to `RootLayout`**

The layout is a Server Component (no `"use client"` — confirmed). Add the JSON-LD block using a plain `<script>` tag with `dangerouslySetInnerHTML` directly in the JSX. Do NOT use `next/script` — it can add `async`/`defer` attributes that make structured data unreliable for crawlers.

Add the schemas constant above the `RootLayout` function, then add the `<script>` tag inside `<head>`:

```tsx
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "parixai",
    "url": "https://parixai.ai",
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
    "url": "https://parixai.ai",
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
    "url": "https://parixai.ai",
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
  )
}
```

- [ ] **Step 2: Run build to confirm no type errors**

Run: `npm run build 2>&1 | tail -20`

Expected: `✓ Compiled successfully`

- [ ] **Step 3: Verify JSON-LD is in the HTML response**

Run: `npm run start` then in a separate terminal:

```bash
curl -s http://localhost:3000 | grep -o 'application/ld+json'
```

Expected output: `application/ld+json` (confirms the script tag is present in the HTML)

---

### Task 9: Commit Chunk 3

- [ ] **Step 1: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add JSON-LD structured data (Organization, SoftwareApplication, FAQPage, WebSite)"
```

---

## Done

All changes are live. Next steps for search engine visibility:
1. Submit `https://parixai.ai/sitemap.xml` to Google Search Console
2. Validate structured data at https://search.google.com/test/rich-results using the live URL
3. Validate OG tags at https://www.opengraph.xyz
