"use client";

const footerImg = "/assets/footer-illustration.jpg";

const FooterSection = () => {
  return (
    <footer className="relative w-full">
      <div className="relative">
        <img
          src={footerImg}
          alt="Mountain landscape illustration"
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-primary/60" />

        <div className="absolute inset-0 flex flex-col justify-end pb-6 px-6">
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs text-primary-foreground/50">
                © 2026 parixai. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#features"
                  className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="https://github.com/featurellm/featurellm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
