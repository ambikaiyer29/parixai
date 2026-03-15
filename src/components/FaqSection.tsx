"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Which AI models does parixai support?",
    answer:
      "parixai supports all major model providers — OpenAI (GPT-4o, GPT-4 Turbo), Anthropic (Claude 3.5, Claude 3), Google (Gemini 1.5 Pro, Flash), Meta (Llama 3), Mistral, and more. New models are added as they become available.",
  },
  {
    question: "Do I need to bring my own API keys?",
    answer:
      "Yes. You connect your own provider API keys so all requests go directly from parixai to the model provider. This keeps your usage under your own account and billing.",
  },
  {
    question: "How is parixai different from just calling the models directly?",
    answer:
      "Calling models directly gives you one result at a time. parixai runs the same prompt across multiple models simultaneously, tracks latency, cost, and accuracy for each run, versions your prompts, and lets you compare results side-by-side — so you can make evidence-based decisions about which model to ship.",
  },
  {
    question: "Is my prompt data stored or used for training?",
    answer:
      "Your prompts and test data are stored securely to power your experiment history and comparisons. We never use your data to train models, and we never share it with third parties.",
  },
  {
    question: "Can I evaluate multiple prompts at once?",
    answer:
      "Yes. You can run a full dataset of inputs through any prompt in a single experiment. Results are aggregated so you see accuracy, latency, and cost across the whole dataset — not just individual samples.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes — the Starter plan is free and includes up to 500 evaluations per month, 3 models per experiment, and full access to the dashboard. No credit card required to get started.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">FAQ</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground mt-4 leading-tight">
            Common questions
          </h2>
        </div>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-muted-foreground"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
