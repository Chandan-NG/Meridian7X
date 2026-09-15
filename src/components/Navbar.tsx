import React, { useState } from "react";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navLogo from "@/assets/brand/nav-logo.png";

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = "Home", onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home", href: "#home" },
    { label: "Community", id: "community", href: "#community" },
    { label: "Event Zone", id: "eventzone", href: "#eventzone" },
    { label: "Contact", id: "contact", href: "#contact" },
  ];

  const currentTabIndex = Math.max(
    0,
    navItems.findIndex(
      (item) =>
        item.label.toLowerCase() === activeSection.toLowerCase() ||
        item.id.toLowerCase() === activeSection.toLowerCase()
    )
  );

  const handleSelectTab = (index: number) => {
    const item = navItems[index];
    if (onNavigate) {
      onNavigate(item.id);
    }
  };

  const handleMobileNav = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-2.5 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-2.5 sm:px-6 pointer-events-none max-w-[100vw]"
    >
      {/* Top Navbar Pill */}
      <div className="pointer-events-auto relative w-full max-w-5xl rounded-full border border-white/20 bg-[#0c0c14]/95 p-1.5 sm:p-2 backdrop-blur-2xl transition-all duration-300 shadow-[0_16px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(143,28,232,0.2),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:border-[#8F1CE8]/50">
        <div className="flex items-center justify-between gap-2 sm:gap-3 px-1.5 sm:px-3">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleSelectTab(0);
            }}
            className="flex items-center shrink-0 select-none cursor-pointer py-0.5 pl-1 transition-transform duration-200 hover:scale-105 active:scale-95 group"
            aria-label="Meridian 7X Home"
          >
            <img
              src={navLogo}
              alt="Meridian 7X"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(143,28,232,0.4)] group-hover:drop-shadow-[0_0_22px_rgba(207,1,202,0.7)] transition-all duration-300"
            />
          </a>

          {/* Centered Navigation Menu (SlideTabs) */}
          <nav className="hidden md:block">
            <SlideTabs
              tabs={navItems.map((n) => n.label)}
              selectedIndex={currentTabIndex}
              onSelect={handleSelectTab}
              className="border-white/10 bg-white/[0.04]"
              tabClassName="font-syne text-xs uppercase tracking-wider font-semibold"
            />
          </nav>

          {/* Right Action Bar: Connect CTA + Mobile Nav Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Glowing CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleSelectTab(3);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-syne text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:shadow-[0_0_24px_rgba(143,28,232,0.6)] hover:scale-105 active:scale-95 border border-white/25 kinetic-gradient"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Navigation Cyber Toggle (High-visibility, illuminated neon accents) */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 bg-[#161624] hover:border-[#cf01ca] hover:shadow-[0_0_20px_rgba(207,1,202,0.6)] active:scale-95 transition-all md:hidden text-white shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              <span className="font-syne text-[11px] font-bold uppercase tracking-wider text-white select-none">
                {mobileMenuOpen ? "CLOSE" : "MENU"}
              </span>

              {/* Glowing animated indicator */}
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-[#ff71e0] filter drop-shadow-[0_0_6px_rgba(255,113,224,0.9)]" />
              ) : (
                <div className="flex flex-col justify-center items-center gap-[3px] w-4 h-3.5">
                  <span className="h-[2px] w-4 rounded-full bg-gradient-to-r from-white via-[#deb7ff] to-[#cf01ca] shadow-[0_0_8px_rgba(207,1,202,0.85)]" />
                  <span className="h-[2px] w-2.5 rounded-full bg-gradient-to-r from-[#cf01ca] to-[#8F1CE8] self-end shadow-[0_0_8px_rgba(143,28,232,0.85)]" />
                  <span className="h-[2px] w-4 rounded-full bg-gradient-to-r from-white via-[#deb7ff] to-[#cf01ca] shadow-[0_0_8px_rgba(207,1,202,0.85)]" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Dropdown Drawer (Positioned cleanly below the pill) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto mt-2 w-full max-w-5xl rounded-3xl border border-white/20 bg-[#0d0d16]/98 backdrop-blur-3xl px-4 py-4 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(143,28,232,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const isActive = idx === currentTabIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileNav(item.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left font-syne text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? "kinetic-gradient text-white shadow-[0_0_25px_rgba(143,28,232,0.5)] border border-white/30"
                        : "text-[#C9CBD2] hover:text-white hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_#fff] animate-pulse" />
                    ) : (
                      <span className="text-[#585863] text-xs font-mono">&rarr;</span>
                    )}
                  </button>
                );
              })}

              <div className="mt-2 pt-2 border-t border-white/15 flex justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNav("contact");
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full px-4 py-3 font-syne text-xs font-bold uppercase tracking-wider text-white border border-white/30 kinetic-gradient shadow-[0_0_25px_rgba(210,10,205,0.5)] hover:shadow-[0_0_35px_rgba(210,10,205,0.8)] transition-all active:scale-95"
                >
                  <span>CONNECT</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
