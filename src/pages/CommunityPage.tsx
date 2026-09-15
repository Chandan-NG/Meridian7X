import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, Zap, ShieldCheck } from "lucide-react";
import { WhatsAppTiltCard } from "@/components/community/WhatsAppTiltCard";
import { CommunityFormTiltCard } from "@/components/community/CommunityFormTiltCard";

interface CommunityPageProps {
  onNavigate?: (pageId: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Cyber-Luxury Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#8F1CE8]/25 via-[#D20ACD]/15 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[800px] -left-40 w-[600px] h-[400px] bg-[#8F1CE8]/15 blur-[150px] rounded-full" />
        <div className="absolute top-[1600px] -right-40 w-[600px] h-[450px] bg-[#D20ACD]/15 blur-[150px] rounded-full" />
      </div>

      {/* ================= PAGE HERO SECTION ================= */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Display Headline */}
          <h1 className="font-syne text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.05] text-[#F5F5F7] mb-6 drop-shadow-2xl break-words">
            Join The{" "}
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(207,1,202,0.45)]">
              Community
            </span>
          </h1>

          {/* Subtitle - Reframed without 'creators' */}
          <p className="font-outfit text-base sm:text-xl text-[#C9CBD2] max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
            A high-energy network connecting ambitious student leaders and visionary brand builders across colleges.
          </p>

          {/* High-Impact Stat Strip Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full max-w-5xl mx-auto">
            {[
              {
                label: "NETWORK MEMBERS",
                value: "10K+",
                icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#deb7ff]" />,
                accentColor: "#8F1CE8",
              },
              {
                label: "CAMPUS CHAPTERS",
                value: "50+",
                icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffade2]" />,
                accentColor: "#D20ACD",
              },
              {
                label: "LIVE ACTIVATIONS",
                value: "100+",
                icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#deb7ff]" />,
                accentColor: "#8F1CE8",
              },
              {
                label: "DIRECT WHATSAPP",
                value: "24/7",
                icon: <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#25D366]" />,
                accentColor: "#25D366",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent p-4 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.12)] text-left"
              >
                {/* Ambient Radial Specular Glow */}
                <div
                  className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-25 transition-opacity duration-300 group-hover:opacity-50"
                  style={{ background: stat.accentColor }}
                />

                {/* Top Row: Icon badge + pulse beacon */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40 backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div
                    className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse"
                    style={{ backgroundColor: stat.accentColor, color: stat.accentColor }}
                  />
                </div>

                {/* Value */}
                <div className="font-syne text-2xl sm:text-4xl font-black text-white tracking-tight leading-none drop-shadow-md">
                  {stat.value}
                </div>

                {/* Micro Label */}
                <div className="font-mono text-[9px] sm:text-[11px] font-semibold tracking-widest text-[#A7A7B0] uppercase mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 1: WHATSAPP COMMUNITY (21st.dev 3D Card Template) ================= */}
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
            WhatsApp <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
              Community
            </span>
          </h2>

          <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
            Join the collegiate ecosystem on WhatsApp. Get live activation announcements, casting dispatches, and direct coordination with the Meridian 7X team.
          </p>
        </motion.div>

        {/* 1 Single 3D Card for WhatsApp Community (Centered) with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center w-full max-w-md mx-auto"
        >
          <WhatsAppTiltCard
            title="WhatsApp Community"
            subtitle="Official Network • 10K+ Members • 50+ College Chapters"
            imageUrl="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80"
            actionText="Join WhatsApp Community"
            whatsappMessage="Hi Meridian 7X, I want to join the official WhatsApp Community!"
          />
        </motion.div>
      </section>

      {/* ================= SECTION 2: COMMUNITY FORMS (21st.dev Card-21 Template) ================= */}
      <section className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
            Official <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
              Community Forms
            </span>
          </h2>

          <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed">
            Select your track below to apply for campus leadership, join our brand promotions team, or take up paid event gigs with the Meridian 7X network.
          </p>
        </motion.div>

        {/* Card-21 Three Cards Layout (Centered & Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 w-full max-w-6xl mx-auto justify-items-center">
          {/* Card 1: Campus Ambassador */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[340px] sm:max-w-[360px] h-[480px]"
          >
            <CommunityFormTiltCard
              id="ambassador"
              title="Campus Ambassador"
              stats="50+ Universities • Leadership Track"
              imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
              actionText="Apply For Ambassador"
              formUrl="#"
              themeColor="275 85% 25%"
            />
          </motion.div>

          {/* Card 2: Brand Promoters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[340px] sm:max-w-[360px] h-[480px]"
          >
            <CommunityFormTiltCard
              id="promotions"
              title="Brand Promoters"
              stats="Brand Activations • Product Sampling • Campus Promos"
              imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
              actionText="Apply As Brand Promoter"
              formUrl="#"
              themeColor="315 90% 25%"
            />
          </motion.div>

          {/* Card 3: Gig Workers (Centered on Tablet md) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-[340px] sm:max-w-[360px] h-[480px] md:col-span-2 lg:col-span-1 justify-self-center"
          >
            <CommunityFormTiltCard
              id="gig-workers"
              title="Gig Workers"
              stats="Event Crew, Ushers & Operations • Paid Gigs"
              imageUrl="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
              actionText="Apply For Event Gigs"
              formUrl="#"
              themeColor="210 90% 25%"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
