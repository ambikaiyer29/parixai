import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const StepItem = ({ step, isReversed }: { step: { badge: string; title: string; description: string; visual: ReactNode }; isReversed: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}
    >
      <div className="lg:w-[40%] space-y-4">
        <span className="section-badge">{step.badge}</span>
        <h2 className="font-serif text-2xl sm:text-4xl text-foreground leading-tight whitespace-pre-line">
          {step.title}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
      <div className="lg:w-[60%]">{step.visual}</div>
    </motion.div>
  );
};

const steps = [
  {
    badge: "Step 1",
    title: "Define your feature\nand pick your models",
    description:
      "Name the LLM-powered feature you want to test. Select which models to evaluate — GPT-4o, Claude 3.5, Gemini Pro, open-source alternatives, anything with an API.",
    visual: (
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground font-mono text-sm space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-4">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
        </div>
        <p><span className="text-green-400">$</span> modellens init --feature "email-summarizer"</p>
        <p className="text-muted-foreground">✓ Feature created</p>
        <p><span className="text-green-400">$</span> modellens add-model gpt-4o claude-3.5-sonnet gemini-pro</p>
        <p className="text-muted-foreground">✓ 3 models added to experiment</p>
      </div>
    ),
  },
  {
    badge: "Step 2",
    title: "Upload test data,\nwrite your prompts",
    description:
      "Add your evaluation dataset and craft the prompts you want to test. Version everything — when you tweak a prompt, that's a new experiment you can compare.",
    visual: (
      <div className="rounded-2xl bg-surface p-6 space-y-4 border border-border">
        <div className="flex items-center justify-between">
          <span className="section-badge">Prompt v2.1</span>
          <span className="text-xs text-muted-foreground">48 test cases</span>
        </div>
        <div className="rounded-xl bg-background p-4 text-sm text-foreground border border-border">
          <p className="text-muted-foreground text-xs mb-2">system prompt</p>
          <p>You are a concise email summarizer. Extract the key action items and summarize in ≤3 bullet points.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-surface-raised text-text-secondary">dataset: emails_q4.jsonl</span>
          <span className="text-xs px-2 py-1 rounded-full bg-surface-raised text-text-secondary">eval: accuracy + brevity</span>
        </div>
      </div>
    ),
  },
  {
    badge: "Step 3",
    title: "Run experiments,\ncompare results",
    description:
      "Execute your test suite across all models in parallel. Get a clear breakdown of cost, latency, and accuracy per model — then decide with data.",
    visual: (
      <div className="rounded-2xl bg-surface p-6 space-y-3 border border-border">
        <div className="text-xs text-muted-foreground mb-2">Experiment #47 — email-summarizer — prompt v2.1</div>
        {[
          { model: "GPT-4o", cost: "$0.42", latency: "1.2s", accuracy: "94%", bar: "w-[94%]", highlight: true },
          { model: "Claude 3.5", cost: "$0.38", latency: "1.8s", accuracy: "91%", bar: "w-[91%]", highlight: false },
          { model: "Gemini Pro", cost: "$0.21", latency: "0.9s", accuracy: "87%", bar: "w-[87%]", highlight: false },
        ].map((row) => (
          <div key={row.model} className={`rounded-xl p-4 ${row.highlight ? "bg-background border border-border" : "bg-surface-raised"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{row.model}</span>
              {row.highlight && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">Best</span>}
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span>Cost: {row.cost}</span>
              <span>Latency: {row.latency}</span>
              <span>Accuracy: {row.accuracy}</span>
            </div>
            <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
              <div className={`h-full bg-foreground/30 rounded-full ${row.bar}`} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 px-6 bg-bg-alt">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-badge">How It Works</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground mt-4 leading-tight">
            Three steps to model clarity
          </h2>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {steps.map((step, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-100px" });
            const isReversed = i % 2 === 1;

            return (
              <motion.div
                ref={ref}
                key={step.badge}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}
              >
                <div className="lg:w-[40%] space-y-4">
                  <span className="section-badge">{step.badge}</span>
                  <h2 className="font-serif text-2xl sm:text-4xl text-foreground leading-tight whitespace-pre-line">
                    {step.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="lg:w-[60%]">{step.visual}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
