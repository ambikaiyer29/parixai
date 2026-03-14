import { useState, useEffect } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Comparison", href: "#comparison" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-center gap-6 rounded-full px-6 py-2.5 border transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-border shadow-sm"
            : "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.12)] backdrop-blur-sm"
        }`}
      >
        <a
          href="#"
          className={`font-serif text-lg ${scrolled ? "text-foreground" : "text-[rgba(255,255,255,0.95)]"}`}
        >
          ModelLens
        </a>
        <div className="hidden sm:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[13.6px] font-medium transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-[rgba(255,255,255,0.8)] hover:text-[rgba(255,255,255,1)]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#cta"
          className={`rounded-full px-4 py-1.5 text-[13.6px] font-medium border transition-colors ${
            scrolled
              ? "btn-primary text-sm"
              : "btn-ghost-dark"
          }`}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
