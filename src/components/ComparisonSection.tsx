"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  {
    without: "Manually prompt each model in the playground, one at a time",
    withProduct: "All models run in parallel against the same test cases in one experiment",
  },
  {
    without: "No record of why you chose a model or what you evaluated",
    withProduct: "Recorded conclusions with full experiment history, visible to your whole team",
  },
  {
    without: "Prompt changes go live with no comparison to the previous version",
    withProduct: "Every prompt version is tracked — compare v1 vs v2 on identical test data",
  },
  {
    without: "Cost estimates are rough token math",
    withProduct: "Interactive cost projector: enter production volume, get exact per-model cost",
  },
  {
    without: "Evaluation is gut feel or manual spot-checking",
    withProduct: "LLM-as-a-judge with Faithfulness, Relevance, Correctness, Tone, Completeness presets",
  },
];

const ComparisonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="comparison" className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">Why parixai</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground mt-4 leading-tight">
            Stop guessing.
            <br />
            Start measuring.
          </h2>
        </div>

        <div ref={ref} className="rounded-2xl bg-surface border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-border">
            <div className="p-4 sm:p-6 text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Without parixai
            </div>
            <div className="p-4 sm:p-6 text-xs uppercase tracking-wider text-foreground font-medium border-l border-border">
              With parixai
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="grid grid-cols-2 border-b border-border last:border-b-0"
            >
              <div className="p-4 sm:p-6 text-sm text-muted-foreground leading-relaxed">
                {row.without}
              </div>
              <div className="p-4 sm:p-6 text-sm text-foreground leading-relaxed border-l border-border">
                {row.withProduct}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
