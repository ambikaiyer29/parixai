# SEO & AEO Optimization — Design Spec
**Date:** 2026-03-15
**Scope:** parixai marketing site (Next.js, `/app` directory)
**Audience:** Developers, product managers, team leads

---

## Goal

Maximize discoverability on Google search (SEO) and AI answer engines like Perplexity, Google AI Overviews, and ChatGPT (AEO) by adding missing technical signals. No content rewrites; all content already on the page is used as-is.

---

## What We're Adding

### 1. Open Graph + Twitter Card Metadata

**File:** `app/layout.tsx` (root metadata export) and per-page metadata in `app/login/page.tsx`, `app/signup/page.tsx`

**Root layout additions to `metadata` export:**
```ts
metadataBase: new URL('https://parixai.ai'),
openGraph: {
  title: 'parixai — LLM Experiment Runner for Product Teams',
  description: 'Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.',
  url: 'https://parixai.ai',
  siteName: 'parixai',
  images: [{ url: '/assets/hero-illustration.jpg', width: 1200, height: 630, alt: 'parixai dashboard' }],
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: 'parixai — LLM Experiment Runner for Product Teams',
  description: 'Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side. Free to self-host.',
  images: ['/assets/hero-illustration.jpg'],
},
```

Login and signup pages get scoped OG tags (their own title/description/url).

**Why:** OG/Twitter tags control how the site looks when shared on Slack, LinkedIn, Twitter/X, and iMessage. AI crawlers (Perplexity, Bing) also read OG tags for entity extraction.

---

### 2. Sitemap

**File:** `app/sitemap.ts` (new file, Next.js App Router convention)

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://parixai.ai', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://parixai.ai/login', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://parixai.ai/signup', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
```

Next.js serves this automatically at `/sitemap.xml`. No manual XML file needed.

**Why:** Sitemaps tell crawlers which pages exist and how frequently they change. Required for reliable indexing.

---

### 3. Canonical URLs

**Files:** `app/layout.tsx`, `app/login/page.tsx`, `app/signup/page.tsx`

Added to each page's `metadata` export:
```ts
alternates: {
  canonical: 'https://parixai.ai',  // per-page URL
}
```

**Why:** Prevents duplicate content penalties when the site is accessed via `www.`, HTTP, or trailing-slash variants.

---

### 4. JSON-LD Structured Data

**File:** `app/layout.tsx` — a single `<Script id="jsonld" type="application/ld+json">` block in `<head>` containing an array of four schemas.

#### 4a. Organization
```json
{
  "@type": "Organization",
  "name": "parixai",
  "url": "https://parixai.ai",
  "logo": "https://parixai.ai/favicon.ico",
  "sameAs": ["https://github.com/featurellm/featurellm"]
}
```
Establishes the company entity. Used by Google's Knowledge Panel and AI engines for entity resolution.

#### 4b. SoftwareApplication
```json
{
  "@type": "SoftwareApplication",
  "name": "parixai",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Open-source LLM experiment runner...",
  "url": "https://parixai.ai"
}
```
Helps AI engines classify parixai when answering queries like "what tools exist for LLM evaluation" or "best prompt testing frameworks".

#### 4c. FAQPage
Maps all 6 FAQ items from `FaqSection.tsx` verbatim:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which AI models does parixai support?",
      "acceptedAnswer": { "@type": "Answer", "text": "parixai supports all major model providers..." }
    },
    ... (all 6 questions)
  ]
}
```
**Highest-value AEO signal.** Google AI Overviews, Perplexity, and ChatGPT heavily cite FAQPage schema for direct answers. The existing FAQ content is already well-suited.

#### 4d. WebSite
```json
{
  "@type": "WebSite",
  "name": "parixai",
  "url": "https://parixai.ai",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://parixai.ai/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```
Enables Google's sitelinks search box. Also reinforces the canonical URL signal.

---

## Files Changed

| File | Change |
|------|--------|
| `app/layout.tsx` | Add `metadataBase`, `openGraph`, `twitter` to metadata export; add JSON-LD `<Script>` block |
| `app/sitemap.ts` | New file — Next.js sitemap convention |
| `app/login/page.tsx` | Add `openGraph`, `twitter`, `alternates.canonical` to metadata |
| `app/signup/page.tsx` | Add `openGraph`, `twitter`, `alternates.canonical` to metadata |

No component changes. No content rewrites.

---

## Out of Scope

- Keyword-focused content rewrites (Option C)
- OG image generation (dynamic `/og` route)
- robots.txt changes (already correct)
- Analytics beyond GA4 (already installed)
