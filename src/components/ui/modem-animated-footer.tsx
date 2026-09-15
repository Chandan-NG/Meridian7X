import React from "react";
import { motion } from "framer-motion";

// Simple cn utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ModemAnimatedFooterProps {
  brandName?: string;
  brandLogo?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: NavLink[];
  creatorName?: string;
  creatorUrl?: string;
  className?: string;
  onNavigate?: (pageId: string) => void;
}

export const ModemAnimatedFooter: React.FC<ModemAnimatedFooterProps> = ({
  brandName = "MERIDIAN 7X",
  brandLogo = "/brand/hero-logo-transparent.png",
  brandDescription = "Connecting brands with youth communities through high-impact college activations, disruptive marketing, and revolutionary digital campaigns.",
  socialLinks = [],
  navLinks = [],
  creatorName = "Meridian 7X",
  creatorUrl = "#",
  className,
  onNavigate,
}) => {
  return (
    <section className={cn("relative w-full mt-12 sm:mt-20 overflow-hidden", className)}>
      {/* Ambient Cyber-Luxury Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-[#8F1CE8]/15 via-[#D20ACD]/10 to-transparent blur-[140px] rounded-full" />
      </div>

      <footer className="relative bg-[#050505]/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-7xl flex flex-col justify-between mx-auto min-h-[22rem] sm:min-h-[25rem] md:min-h-[28rem] relative p-4 py-12 sm:py-16"
        >
          {/* Top Content: Brand Identity & Links */}
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full z-20">
            <div className="w-full flex flex-col items-center">
              {/* Brand Heading / Hero Logo & Description */}
              <div className="space-y-4 flex flex-col items-center flex-1 text-center">
                <a
                  href="#home"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate("home");
                    }
                  }}
                  className="inline-block transition-transform duration-300 hover:scale-105 select-none cursor-pointer"
                  aria-label="Meridian 7X Home"
                >
                  <img
                    src={brandLogo || "/brand/hero-logo-transparent.png"}
                    alt={brandName}
                    className="h-14 sm:h-18 md:h-22 w-auto max-w-[280px] sm:max-w-xs md:max-w-md object-contain filter drop-shadow-[0_6px_35px_rgba(143,28,232,0.5)]"
                  />
                </a>

                <p className="font-outfit text-sm sm:text-base text-[#C9CBD2] text-center w-full max-w-md sm:max-w-lg px-4 sm:px-0 leading-relaxed">
                  {brandDescription}
                </p>
              </div>

              {/* Social Links: Bigger, Borderless, Smooth Hover Glow */}
              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-6 gap-6 sm:gap-8 items-center justify-center">
                  {socialLinks.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.href === "#" || item.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.href === "#" || item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      onClick={(e) => {
                        if (item.href === "#") {
                          e.preventDefault();
                        }
                      }}
                      className="group text-[#A7A7B0] hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_18px_rgba(207,1,202,0.85)] p-1 focus:outline-none cursor-pointer"
                      aria-label={item.label}
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </div>
                      <span className="sr-only">{item.label}</span>
                    </a>
                  ))}
                </div>
              )}

              {/* Navigation Menu */}
              {navLinks.length > 0 && (
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold tracking-wider uppercase font-syne text-[#A7A7B0] max-w-full px-4">
                  {navLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      onClick={(e) => {
                        if (onNavigate) {
                          e.preventDefault();
                          const pageId = link.href.replace("#", "");
                          onNavigate(pageId);
                        }
                      }}
                      className="transition-colors duration-300 hover:text-white hover:text-shadow-[0_0_12px_rgba(222,183,255,0.6)] cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="mt-14 sm:mt-18 flex flex-col gap-3 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0 z-20 border-t border-white/10 pt-6">
            <p className="font-mono-telemetry text-xs tracking-widest text-[#7E7E8F] text-center md:text-left">
              &copy; {new Date().getFullYear()} {brandName.toUpperCase()}. ALL RIGHTS RESERVED.
            </p>

            {creatorName && (
              <p className="font-mono-telemetry text-xs tracking-widest text-[#7E7E8F] text-center md:text-right">
                {creatorUrl ? (
                  <a
                    href={creatorUrl}
                    className="hover:text-white transition-colors duration-300"
                  >
                    CONNECTING BRANDS TO THE MASSES
                  </a>
                ) : (
                  <span>CONNECTING BRANDS TO THE MASSES</span>
                )}
              </p>
            )}
          </div>
        </motion.div>
      </footer>
    </section>
  );
};

export { ModemAnimatedFooter as Footer };
export default ModemAnimatedFooter;
