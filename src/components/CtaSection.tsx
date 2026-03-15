"use client";

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
          Your next model decision deserves a paper trail
        </h2>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
          parixai is open source and free to self-host. Or join the waitlist for a managed cloud version.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <a href="https://github.com/featurellm/featurellm" className="btn-primary">
            Self-Host for Free →
          </a>
          <a href="#pricing" className="btn-outline">
            See Pricing ↓
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Open source · MIT licensed · No vendor lock-in
        </p>
      </motion.div>
    </section>
  );
};

export default CtaSection;
