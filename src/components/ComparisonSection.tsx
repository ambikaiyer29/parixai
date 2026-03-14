import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  {
    without: "Manually test each model by hand, one at a time",
    withProduct: "Run all models in parallel with one command",
  },
  {
    without: "Guess at costs based on token estimates",
    withProduct: "Exact per-request cost tracking in real dollars",
  },
  {
    without: "New model comes out — start evaluation from scratch",
    withProduct: "One-click re-run of all experiments on the new model",
  },
  {
    without: "Prompt changes go untested or are tested informally",
    withProduct: "Every prompt version is a tracked experiment",
  },
  {
    without: "No audit trail of which model is used where",
    withProduct: "Feature-level model registry with full history",
  },
];

const ComparisonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="comparison" className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">Why ModelLens</span>
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
              Without
            </div>
            <div className="p-4 sm:p-6 text-xs uppercase tracking-wider text-foreground font-medium border-l border-border">
              With ModelLens
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
