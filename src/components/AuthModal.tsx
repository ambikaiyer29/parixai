"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
}

export default function AuthModal({ mode: initialMode, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

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

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    // Simulate async call
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Welcome back! You're on the waitlist.", {
      description: `We'll reach out to ${data.email} when your account is ready.`,
    });
    onClose();
  };

  const handleSignup = async (data: SignupFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("You're on the waitlist!", {
      description: `We'll send early access details to ${data.email}.`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-background rounded-2xl border border-border shadow-xl w-full max-w-md p-8">
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

        {/* Tab switcher */}
        <div className="flex rounded-full border border-border p-1 mb-6 bg-secondary">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
              mode === "login"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                {...loginForm.register("email")}
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {loginForm.formState.errors.email && (
                <p className="mt-1 text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                {...loginForm.register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {loginForm.formState.errors.password && (
                <p className="mt-1 text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginForm.formState.isSubmitting}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loginForm.formState.isSubmitting ? "Logging in…" : "Log In"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              parixai cloud is in early access.{" "}
              <button type="button" onClick={() => setMode("signup")} className="underline hover:text-foreground">
                Join the waitlist
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Work Email</label>
              <input
                {...signupForm.register("email")}
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {signupForm.formState.errors.email && (
                <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                {...signupForm.register("password")}
                type="password"
                placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {signupForm.formState.errors.password && (
                <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
              <input
                {...signupForm.register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={signupForm.formState.isSubmitting}
              className="btn-primary w-full disabled:opacity-60"
            >
              {signupForm.formState.isSubmitting ? "Joining waitlist…" : "Join Waitlist →"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")} className="underline hover:text-foreground">
                Log in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
