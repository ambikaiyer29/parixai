"use client";

import { useEffect } from "react";

const APP_URL = "https://app.parixai.com";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const href = mode === "login" ? `${APP_URL}/login` : `${APP_URL}/signup`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl border border-border shadow-xl w-full max-w-md p-8 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-6">
          <span className="font-serif text-2xl text-foreground">parixai</span>
        </div>

        <p className="text-muted-foreground text-sm mb-6">
          {mode === "login"
            ? "Sign in to your parixai dashboard."
            : "Create your parixai account and start running LLM experiments."}
        </p>

        <a
          href={href}
          className="btn-primary w-full block text-center"
        >
          {mode === "login" ? "Log In →" : "Sign Up →"}
        </a>

        <p className="mt-4 text-xs text-muted-foreground">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <a href={`${APP_URL}/signup`} className="underline hover:text-foreground">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href={`${APP_URL}/login`} className="underline hover:text-foreground">
                Log in
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
