"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-20 sm:py-32 px-6 bg-bg-alt">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge">Pricing</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-foreground mt-4 leading-tight">
            Start free.
            <br />
            Scale when you're ready.
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Self-Hosted — Free */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-background border border-border p-8 flex flex-col"
          >
            <div className="mb-6">
              <span className="section-badge mb-3 inline-block">Self-Hosted</span>
              <div className="flex items-end gap-2 mt-4">
                <span className="font-serif text-5xl text-foreground">Free</span>
                <span className="text-muted-foreground text-sm mb-1">forever</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Run parixai on your own infrastructure. Full feature access,
                your data stays on your servers, Apache 2.0 License.
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Unlimited experiments",
                "All model providers",
                "Prompt versioning",
                "Cost & latency tracking",
                "Custom eval criteria",
                "Team collaboration",
                "CLI + REST API",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <svg className="w-4 h-4 text-foreground/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://github.com/featurellm/featurellm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center"
            >
              Deploy on GitHub →
            </a>
          </motion.div>

          {/* Cloud — Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl bg-primary border border-primary p-8 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground/90 border border-primary-foreground/20">
                Coming Soon
              </span>
            </div>

            <div className="mb-6">
              <span className="inline-block rounded-full px-3.5 py-1 text-xs font-medium bg-primary-foreground/10 text-primary-foreground/80 mb-3">Cloud</span>
              <div className="flex items-end gap-2 mt-4">
                <span className="font-serif text-5xl text-primary-foreground">Early Access</span>
              </div>
              <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
                Fully managed. No infra to run, automatic model updates,
                team dashboards, and priority support.
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Everything in Self-Hosted",
                "Managed hosting — zero ops",
                "Automatic model registry updates",
                "Shareable experiment reports",
                "SSO & role-based access",
                "Priority support",
                "SLA guarantee",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground">
                  <svg className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium bg-primary-foreground text-primary transition-opacity hover:opacity-90 w-full text-center"
            >
              Join the Waitlist →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
