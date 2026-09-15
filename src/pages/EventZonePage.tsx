import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Flame } from "lucide-react";
import { EventFlippingCard } from "@/components/events/EventFlippingCard";
import { PastEventsCardStack } from "@/components/events/PastEventsCardStack";

interface EventZonePageProps {
  onNavigate?: (pageId: string) => void;
}

export const EventZonePage: React.FC<EventZonePageProps> = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Cyber-Luxury Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#8F1CE8]/20 via-[#D20ACD]/15 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[850px] -left-40 w-[600px] h-[400px] bg-[#8F1CE8]/15 blur-[150px] rounded-full" />
        <div className="absolute top-[1700px] -right-40 w-[600px] h-[450px] bg-[#D20ACD]/15 blur-[150px] rounded-full" />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Display Headline */}
          <h1 className="font-syne text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.05] text-[#F5F5F7] mb-6 drop-shadow-2xl break-words">
            Event{" "}
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(207,1,202,0.45)]">
              Zone
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-outfit text-base sm:text-xl text-[#C9CBD2] max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
            Campus activations, electrifying festivals, and branded experiential journeys powered by Meridian 7X.
          </p>

          {/* Highlights Telemetry Bar - 3 Clean Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
            {[
              {
                label: "EVENTS MANAGED",
                value: "50+",
                icon: <Flame className="h-5 w-5 text-[#deb7ff]" />,
                accentColor: "#8F1CE8",
              },
              {
                label: "TOTAL ATTENDEES",
                value: "100K+",
                icon: <Users className="h-5 w-5 text-[#ffade2]" />,
                accentColor: "#D20ACD",
              },
              {
                label: "CAMPUSES COVERED",
                value: "25+",
                icon: <MapPin className="h-5 w-5 text-[#deb7ff]" />,
                accentColor: "#8F1CE8",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.12)] text-left"
              >
                <div
                  className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-25 transition-opacity duration-300 group-hover:opacity-50"
                  style={{ background: stat.accentColor }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40 backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div
                    className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse"
                    style={{ backgroundColor: stat.accentColor, color: stat.accentColor }}
                  />
                </div>
                <div className="font-syne text-3xl sm:text-4xl font-black text-white tracking-tight leading-none drop-shadow-md">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#A7A7B0] uppercase mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 1: UPCOMING EVENTS (21st.dev Flipping Card) ================= */}
      <section className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
            Upcoming <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
              Events
            </span>
          </h2>

          <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
            Discover our upcoming campus events and brand experiences. Hover or tap a card to explore and secure your entry pass.
          </p>
        </motion.div>

        {/* 2 Upcoming Event Flipping Cards with Staggered Scroll Reveal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-5xl mx-auto">
          {/* Card 1: Sonic Horizon Fest 2026 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full flex justify-center"
          >
            <EventFlippingCard
              id="sonic-horizon"
              eventName="Sonic Horizon Fest 2026"
              category="Campus Music Festival"
              date="November 14, 2026"
              place="IIT Delhi Amphitheatre"
              city="New Delhi"
              imageUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
              description="An electrifying 8-hour music experience featuring headline electronic artists, live stage visuals, and exclusive student brand lounges."
              buttonText="Register"
              formUrl="#"
            />
          </motion.div>

          {/* Card 2: Pixel Arena */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <EventFlippingCard
              id="pixel-arena"
              eventName="Pixel Arena: College Esports League"
              category="Gaming & Creator Arena"
              date="December 05, 2026"
              place="BITS Pilani Auditorium"
              city="Goa"
              imageUrl="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"
              description="Compete in high-stakes inter-college tournaments, test unreleased gaming titles, and connect directly with top digital creators."
              buttonText="Register"
              formUrl="#"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 2: PAST EVENTS ================= */}
      <section className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
            Past <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
              Events
            </span>
          </h2>

          <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
            Explore our past campus events, college festivals, and brand activations.
          </p>
        </motion.div>

        {/* 3D Card Stack Carousel with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PastEventsCardStack />
        </motion.div>
      </section>
    </div>
  );
};

export default EventZonePage;
