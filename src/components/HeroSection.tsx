"use client";

import { motion } from "framer-motion";

const heroImg = "/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full">
      {/* Hero illustration */}
      <div className="relative w-full h-[55vh] sm:h-[60vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Abstract ukiyo-e illustration of neural networks flowing through nature"
          className="w-full h-full object-cover"
        />
        {/* Gradient fade to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Hero text overlapping the transition */}
      <div className="relative -mt-32 sm:-mt-40 z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.15] text-foreground max-w-4xl mx-auto"
        >
          The open-source LLM experiment runner
          <br />
          for product teams.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Define test sets, version prompts, and compare GPT-4o, Claude, Gemini side-by-side — with cost, latency, and quality scores. Free to self-host. Built for teams who ship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-4 flex-wrap"
        >
          <a href="https://app.parixai.ai/signup" className="btn-primary">
            Get Started Free →
          </a>
          <a href="https://github.com/ambikaiyer29/featurellm-oss" className="btn-outline">
            Self-Host ↗
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          Cloud hosted · Free to self-host · No credit card required
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
