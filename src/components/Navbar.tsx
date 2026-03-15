"use client";

import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Comparison", href: "#comparison" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`flex items-center gap-6 rounded-full px-6 py-2.5 border transition-all duration-300 ${
            scrolled
              ? "bg-background/90 backdrop-blur-md border-border shadow-sm"
              : "bg-white/80 backdrop-blur-md border-black/8 shadow-sm"
          }`}
        >
          <a
            href="#"
            className="font-serif text-lg text-foreground"
          >
            parixai
          </a>
          <div className="hidden sm:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13.6px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAuthModal("login")}
              className="rounded-full px-4 py-1.5 text-[13.6px] font-medium border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => setAuthModal("signup")}
              className="btn-primary !px-4 !py-1.5 text-[13.6px]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} />
      )}
    </>
  );
};

export default Navbar;
