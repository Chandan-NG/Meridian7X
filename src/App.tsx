import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ModemAnimatedFooter } from "@/components/ui/modem-animated-footer";
import { XIcon, InstagramIcon, LinkedInIcon } from "@/components/icons/social-icons";
import { Mail } from "lucide-react";

import { HomePage } from "@/pages/HomePage";
import { CommunityPage } from "@/pages/CommunityPage";
import { EventZonePage } from "@/pages/EventZonePage";
import { ContactPage } from "@/pages/ContactPage";

type PageId = "home" | "community" | "eventzone" | "contact";

export default function App() {
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace(/^#/, "").toLowerCase();
    if (hash === "community") return "community";
    if (hash === "eventzone" || hash === "event-zone" || hash === "events") return "eventzone";
    if (hash === "contact") return "contact";
    return "home";
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const targetPage = getPageFromHash();
      setCurrentPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (pageId: string) => {
    const cleanId = pageId.replace(/^#/, "").toLowerCase();
    const validPage: PageId =
      cleanId === "community"
        ? "community"
        : cleanId === "eventzone" || cleanId === "event-zone" || cleanId === "events"
        ? "eventzone"
        : cleanId === "contact"
        ? "contact"
        : "home";

    setCurrentPage(validPage);
    window.location.hash = validPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map PageId to Navbar label
  const pageLabelMap: Record<PageId, string> = {
    home: "Home",
    community: "Community",
    eventzone: "Event Zone",
    contact: "Contact",
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F7] transition-colors duration-500 overflow-hidden font-outfit flex flex-col justify-between">
      {/* Background Cyber-Luxury Ambient Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50 dark:opacity-40">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-[#8F1CE8]/30 via-[#D20ACD]/15 to-transparent blur-[120px]" />
        <div className="absolute top-[60vh] -left-40 h-[400px] w-[500px] rounded-full bg-[#7A16D9]/20 blur-[140px]" />
        <div className="absolute top-[120vh] -right-40 h-[450px] w-[550px] rounded-full bg-[#D20ACD]/20 blur-[150px]" />
      </div>

      {/* Static & Floating Navbar (Constant across all pages) */}
      <Navbar
        activeSection={pageLabelMap[currentPage]}
        onNavigate={handleNavigate}
      />

      {/* Main Dynamic Content Area */}
      <main className="relative z-10 flex-1 pt-12">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "community" && <CommunityPage onNavigate={handleNavigate} />}
        {currentPage === "eventzone" && <EventZonePage onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Modem Animated Footer (Constant across all pages) */}
      <ModemAnimatedFooter
        brandName="MERIDIAN 7X"
        brandLogo="/brand/hero-logo-transparent.png"
        brandDescription="Connecting brands with youth communities through high-impact college activations, disruptive marketing, and revolutionary digital campaigns."
        onNavigate={handleNavigate}
        socialLinks={[
          {
            icon: <XIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
            href: "#",
            label: "X (Twitter)",
          },
          {
            icon: <InstagramIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
            href: "#",
            label: "Instagram",
          },
          {
            icon: <LinkedInIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
            href: "#",
            label: "LinkedIn",
          },
          {
            icon: <Mail className="w-7 h-7 sm:w-8 sm:h-8" />,
            href: "#",
            label: "Email",
          },
        ]}
        navLinks={[
          { label: "Home", href: "#home" },
          { label: "Community", href: "#community" },
          { label: "Event Zone", href: "#eventzone" },
          { label: "Contact", href: "#contact" },
        ]}
        creatorName="Meridian 7X"
        creatorUrl="#contact"
      />
    </div>
  );
}
