import footerImg from "@/assets/footer-illustration.jpg";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Developers: ["Documentation", "API Reference", "SDK", "CLI"],
  Resources: ["Blog", "Guides", "Community", "Support"],
  Company: ["About", "Careers", "Privacy", "Terms"],
};

const FooterSection = () => {
  return (
    <footer className="relative w-full">
      <div className="relative">
        <img
          src={footerImg}
          alt="Mountain landscape illustration"
          className="w-full h-72 sm:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-primary/60" />

        <div className="absolute inset-0 flex flex-col justify-end pb-8 px-6">
          <div className="max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-primary-foreground font-sans text-sm font-medium mb-3">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-xs text-primary-foreground/70 hover:text-primary-foreground/100 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-primary-foreground/20 pt-4">
              <p className="text-xs text-primary-foreground/50">
                © 2026 ModelLens. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
