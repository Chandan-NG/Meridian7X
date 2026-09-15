import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { GraduationCap, Megaphone, Ticket } from "lucide-react";

export interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  shaderColors: string[];
  accentColor: string;
}

const defaultServices: ServiceCardItem[] = [
  {
    id: "campus-marketing",
    number: "01",
    title: "Campus Marketing",
    tagline: "Dominating Collegiate Spaces",
    description:
      "Direct on-ground access to vibrant student communities through ambassador networks, experiential activations, and authentic peer advocacy.",
    icon: GraduationCap,
    shaderColors: ["#050505", "#8F1CE8", "#3A0D63", "#120826"],
    accentColor: "#8F1CE8",
  },
  {
    id: "promotions",
    number: "02",
    title: "Promotions",
    tagline: "Igniting Cultural Momentum",
    description:
      "High-impact creative takeovers and targeted digital campaigns that turn passive audiences into passionate, long-term brand evangelists.",
    icon: Megaphone,
    shaderColors: ["#050505", "#D20ACD", "#7A16D9", "#200624"],
    accentColor: "#D20ACD",
  },
  {
    id: "events",
    number: "03",
    title: "Events",
    tagline: "Engineering Immersive Arenas",
    description:
      "Complete production for youth festivals, brand pop-ups, and live events that draw massive crowds.",
    icon: Ticket,
    shaderColors: ["#050505", "#9333EA", "#D20ACD", "#0F0B1E"],
    accentColor: "#deb7ff",
  },
];

class ShaderErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("Shader canvas fallback active:", error.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface FeatureShaderCardsProps {
  services?: ServiceCardItem[];
}

export const FeatureShaderCards: React.FC<FeatureShaderCardsProps> = ({
  services = defaultServices,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
      {services.map((service, idx) => {
        const IconComponent = service.icon;
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{ y: -6 }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/12 bg-[#0d0d12] p-6 sm:p-8 lg:p-9 transition-all duration-500 hover:border-[#8F1CE8]/60 hover:shadow-[0_20px_50px_rgba(143,28,232,0.35)] min-h-[420px] sm:min-h-[460px] h-full ${
              idx === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto w-full" : ""
            }`}
          >
            {/* Animated Shader Canvas Background with Resilient Error Boundary */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <ShaderErrorBoundary
                fallback={
                  <div
                    className="w-full h-full opacity-60 group-hover:opacity-85 transition-opacity duration-700 bg-gradient-to-br"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${service.accentColor}33 0%, #050505 80%)`,
                    }}
                  />
                }
              >
                <MeshGradient
                  colors={service.shaderColors}
                  distortion={0.75}
                  swirl={0.6}
                  grainMixer={0.12}
                  grainOverlay={0.08}
                  speed={0.8}
                  className="w-full h-full opacity-65 group-hover:opacity-90 transition-opacity duration-700"
                />
              </ShaderErrorBoundary>
              {/* Cyber-Obsidian Gradient Overlays for High Contrast & Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#0a0a0f]/80 to-[#050505]/95" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(210,10,205,0.15),transparent_70%)]" />
            </div>

            {/* Ambient Top Glow on Hover */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
              }}
            />

            {/* 1. Top Header: Icon & Telemetry Numbering */}
            <div className="flex items-center justify-between mb-8">
              {/* Prominent High-Tech Icon Container */}
              <div className="relative flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-white/20 bg-[#111116]/85 p-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:border-[#8F1CE8]">
                <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:text-[#deb7ff] transition-colors duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-[#8F1CE8]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Numbering */}
              <div className="flex items-center px-3 py-1 rounded-full border border-white/15 bg-black/50 backdrop-blur-md">
                <span className="font-mono-telemetry text-xs font-bold tracking-widest text-[#deb7ff]">
                  {service.number}
                </span>
              </div>
            </div>

            {/* 2. Structured Content Block with Calibrated Uniform Heights */}
            <div className="mt-auto flex flex-col justify-end">
              {/* Card Title Container (Calibrated for uniform multi-line alignment) */}
              <div className="min-h-[3.8rem] sm:min-h-[4.2rem] flex items-center mb-2">
                <h3 className="font-syne text-2xl sm:text-[26px] lg:text-[28px] font-extrabold uppercase tracking-tight text-white group-hover:text-[#deb7ff] transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Tagline Container (Uniform height across all cards) */}
              <div className="min-h-[2.4rem] sm:min-h-[2.8rem] flex items-center mb-4">
                <p className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] leading-snug">
                  {service.tagline}
                </p>
              </div>

              {/* One-Liner Explanation (Uniform baseline & top border) */}
              <div className="pt-4 border-t border-white/10 min-h-[4.5rem] sm:min-h-[5rem] flex items-start">
                <p className="font-outfit text-sm sm:text-[15px] text-[#C9CBD2] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
