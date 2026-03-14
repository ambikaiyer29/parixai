import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="cta" className="py-20 sm:py-32 px-6 bg-bg-alt">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-prose mx-auto text-center"
      >
        <h2 className="font-serif text-3xl sm:text-5xl text-foreground leading-tight">
          Your next model decision
          <br />
          shouldn't be a guess
        </h2>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Start running structured experiments across LLMs today.
          Track what matters — cost, speed, quality — and switch models with zero risk.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <a href="#" className="btn-primary">
            Get Early Access →
          </a>
          <a href="#" className="btn-outline">
            Read the Docs ↗
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
