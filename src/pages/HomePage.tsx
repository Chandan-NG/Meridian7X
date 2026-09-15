import React from "react";
import { motion } from "framer-motion";
import { KineticGrid } from "@/components/ui/kinetic-grid";
import { FeatureShaderCards } from "@/components/ui/feature-shader-cards";
import { CapabilitiesCards } from "@/components/ui/capabilities-cards";
import { EventsCircularShowcase } from "@/components/ui/events-circular-showcase";
import { WhatsAppIcon } from "@/components/icons/social-icons";
import { ArrowRight, ArrowUpRight, Users } from "lucide-react";

interface HomePageProps {
  onNavigate?: (pageId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      {/* SECTION 1: HERO SECTION WITH SATORIUI KINETIC GRID */}
      <section
        id="home"
        className="relative min-h-[90vh] sm:min-h-[95vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 text-center overflow-hidden"
      >
        {/* Interactive Kinetic Grid Canvas Background */}
        <KineticGrid
          gridSize={42}
          interactionRadius={190}
          attractionStrength={0.55}
          dotColor="rgba(255, 255, 255, 0.22)"
          activeDotColor="#deb7ff"
          lineColor="rgba(255, 255, 255, 0.08)"
          activeLineColor="rgba(143, 28, 232, 0.45)"
          showCircle={true}
          className="z-0"
        />

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pointer-events-none w-full">
          {/* Attached Brand Logo */}
          <div className="pointer-events-auto relative mb-5 sm:mb-8 w-full max-w-xs sm:max-w-md md:max-w-xl px-4 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src="/brand/hero-logo-transparent.png"
              alt="Meridian 7X"
              className="mx-auto h-auto max-h-16 sm:max-h-24 md:max-h-32 w-full object-contain filter drop-shadow-[0_10px_35px_rgba(143,28,232,0.45)]"
            />
          </div>

          {/* High-Impact Hero Headline */}
          <h1 className="font-syne text-2xl min-[375px]:text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[1.08] sm:leading-[1.05] text-[#F5F5F7] mb-5 sm:mb-6 drop-shadow-2xl break-words">
            <span className="block">Connecting Brands To</span>
            <span className="block bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(207,1,202,0.45)]">
              THE MASSES.
            </span>
          </h1>

          {/* Catchy Services Subtitle */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#A7A7B0] leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            A specialized agency building premium experiences, high-impact college activations, and revolutionary digital campaigns.
          </p>

          {/* Action CTAs */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#contact"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("contact");
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-8 py-3.5 sm:py-4 font-syne text-xs uppercase tracking-wider font-bold text-white shadow-xl kinetic-gradient border border-white/25 hover:shadow-[0_0_30px_rgba(143,28,232,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 text-center"
            >
              <span>Get In Touch</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#community"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("community");
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-7 sm:px-8 py-3.5 sm:py-4 font-syne text-xs uppercase tracking-wider font-bold text-[#F5F5F7] border border-white/20 bg-[#111116]/85 backdrop-blur-xl hover:border-[#8F1CE8] hover:shadow-[0_0_25px_rgba(143,28,232,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] group text-center"
            >
              <span>Join Community</span>
              <Users className="h-4 w-4 text-[#deb7ff] group-hover:text-[#D20ACD] transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* TRANSITIONAL SCROLL TO EXPLORE BUTTON */}
      <div className="relative z-20 flex items-center justify-center px-4 py-8">
        <motion.button
          onClick={() => {
            document.getElementById("why-partner")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center gap-3.5 rounded-full border border-white/20 bg-[#111116]/90 px-6 py-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-2xl transition-all duration-300 hover:border-[#8F1CE8] hover:shadow-[0_0_35px_rgba(143,28,232,0.5)] cursor-pointer"
          aria-label="Scroll to explore"
        >
          {/* Ambient hover glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#8F1CE8]/30 via-[#D20ACD]/30 to-[#8F1CE8]/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

          {/* Cyber Pill with Sliding Kinetic Dot */}
          <div className="relative w-4 h-6 rounded-full border border-white/25 bg-black/50 flex items-start justify-center p-0.5 shadow-inner">
            <motion.div
              animate={{
                y: [0, 9, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#deb7ff] to-[#D20ACD] shadow-[0_0_6px_#D20ACD]"
            />
          </div>

          <span className="font-syne text-xs uppercase tracking-[0.22em] font-bold text-[#E6E7EB] group-hover:text-white transition-colors">
            Scroll To Explore
          </span>
        </motion.button>
      </div>

      {/* SECTION 2: WHY PARTNER WITH US (FEATURE SHADER CARDS) */}
      <section
        id="why-partner"
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Ambient Cyber-Luxury Glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#8F1CE8]/15 via-[#D20ACD]/15 to-transparent blur-[140px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          >
            <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
              Why Partner <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
                With Us
              </span>
            </h2>

            <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
              We combine bold creativity with sharp execution to deliver results that truly stand out.
            </p>
          </motion.div>

          {/* Feature Shader Cards */}
          <FeatureShaderCards />
        </div>
      </section>

      {/* SECTION 3: MAKING IMPACT (METRIC STAT CARDS) */}
      <section
        id="making-impact"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Ambient Cyber-Luxury Glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#D20ACD]/15 via-[#8F1CE8]/15 to-transparent blur-[140px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          >
            <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
              Making <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
                Impact
              </span>
            </h2>

            <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
              Connecting brands with youth communities through engaging campus events and creative campaigns.
            </p>
          </motion.div>

          {/* Plain Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Events Managed */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center justify-between text-center overflow-hidden rounded-3xl border border-white/12 bg-[#0d0d12]/90 p-8 sm:p-10 transition-all duration-500 hover:border-[#8F1CE8]/60 hover:shadow-[0_20px_50px_rgba(143,28,232,0.25)] min-h-[260px] sm:min-h-[300px]"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-syne text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#A7A7B0] group-hover:text-[#deb7ff] transition-colors duration-300">
                  Events Managed
                </span>
                <div className="font-syne text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mt-4 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#deb7ff] group-hover:via-[#cf01ca] group-hover:to-[#ffade2] transition-all duration-300">
                  100+
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 w-full text-center mt-6">
                <p className="font-outfit text-sm sm:text-base text-[#C9CBD2] leading-relaxed">
                  Successful events and activations.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Brand Clients */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center justify-between text-center overflow-hidden rounded-3xl border border-white/12 bg-[#0d0d12]/90 p-8 sm:p-10 transition-all duration-500 hover:border-[#D20ACD]/60 hover:shadow-[0_20px_50px_rgba(210,10,205,0.25)] min-h-[260px] sm:min-h-[300px]"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-syne text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#A7A7B0] group-hover:text-[#ffade2] transition-colors duration-300">
                  Brand Clients
                </span>
                <div className="font-syne text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mt-4 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#deb7ff] group-hover:via-[#cf01ca] group-hover:to-[#ffade2] transition-all duration-300">
                  20+
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 w-full text-center mt-6">
                <p className="font-outfit text-sm sm:text-base text-[#C9CBD2] leading-relaxed">
                  Forward-thinking corporate partners and industry leaders.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Network Reach */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center justify-between text-center overflow-hidden rounded-3xl border border-white/12 bg-[#0d0d12]/90 p-8 sm:p-10 transition-all duration-500 hover:border-[#8F1CE8]/60 hover:shadow-[0_20px_50px_rgba(143,28,232,0.25)] min-h-[260px] sm:min-h-[300px]"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-syne text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#A7A7B0] group-hover:text-[#deb7ff] transition-colors duration-300">
                  Network Reach
                </span>
                <div className="font-syne text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mt-4 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#deb7ff] group-hover:via-[#cf01ca] group-hover:to-[#ffade2] transition-all duration-300">
                  10K+
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 w-full text-center mt-6">
                <p className="font-outfit text-sm sm:text-base text-[#C9CBD2] leading-relaxed">
                  Active community members.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR CAPABILITIES */}
      <section
        id="capabilities"
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Ambient Cyber-Luxury Glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-[#8F1CE8]/15 via-[#D20ACD]/15 to-transparent blur-[140px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          >
            <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
              Our <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
                Capabilities
              </span>
            </h2>

            <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
              Specialized services designed to build brand awareness, engage communities, and execute flawless experiences.
            </p>
          </motion.div>

          <CapabilitiesCards />
        </div>
      </section>

      {/* SECTION 5: OUR IMPACT (MAJOR EVENTS 3D CAROUSEL) */}
      <section
        id="our-impact"
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <EventsCircularShowcase />
      </section>

      {/* SECTION: LET'S CONNECT CTA */}
      <section
        id="contact-cta"
        className="relative py-24 sm:py-36 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center text-center"
      >
        {/* Cyber-Luxury Ambient Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[350px] bg-gradient-to-b from-[#8F1CE8]/25 via-[#D20ACD]/15 to-transparent blur-[130px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          <h2 className="font-syne text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#F5F5F7] mb-6 drop-shadow-2xl leading-[1.05] break-words">
            Let's{" "}
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(207,1,202,0.45)]">
              Connect
            </span>
          </h2>

          <p className="font-outfit text-base sm:text-xl text-[#C9CBD2] max-w-2xl mx-auto leading-relaxed mb-10">
            <span className="block">
              Ready to ignite unforgettable campus activations or connect with our high-energy youth community?
            </span>
            <span className="block mt-2 sm:mt-3 font-medium text-[#F5F5F7]">
              Let's build your next breakthrough together.
            </span>
          </p>

          <a
            href="#contact"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("contact");
              }
            }}
            className="inline-flex items-center gap-3.5 rounded-full px-7 sm:px-10 py-3.5 sm:py-5 font-syne text-sm sm:text-base uppercase tracking-wider font-bold text-white shadow-[0_0_35px_rgba(143,28,232,0.55)] bg-gradient-to-r from-[#8F1CE8] via-[#D20ACD] to-[#8F1CE8] bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_55px_rgba(210,10,205,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/25 group cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform duration-300 group-hover:scale-110" />
            <span>Chat On WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-white/85" />
          </a>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;
