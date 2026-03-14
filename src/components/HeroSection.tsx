import { motion } from "framer-motion";
import heroImg from "@/assets/hero-illustration.jpg";

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
          Know which model performs best.
          <br />
          Prove it with every prompt.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          A/B test your LLM-powered features across models. Track cost, latency,
          and accuracy — then swap with confidence when better models arrive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 flex items-center justify-center gap-4 flex-wrap"
        >
          <a href="#cta" className="btn-primary">
            Start Testing →
          </a>
          <a href="#features" className="btn-outline">
            See Features
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
