import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Megaphone, Sliders, Radio } from "lucide-react";

export interface CapabilityItem {
  id: string;
  title: string;
  sentence: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  borderColor: string;
  hoverBorderColor: string;
  shadowColor: string;
  colSpan: string;
}

const capabilities: CapabilityItem[] = [
  {
    id: "campus-activations",
    title: "Campus Activations",
    sentence: "Interactive on-ground college campaigns and brand pop-ups that spark real student engagement.",
    icon: Compass,
    color: "#8F1CE8",
    bgGradient: "linear-gradient(135deg, rgba(143,28,232,0.30) 0%, rgba(143,28,232,0.10) 55%, rgba(13,10,22,0.95) 100%)",
    borderColor: "rgba(143,28,232,0.30)",
    hoverBorderColor: "rgba(143,28,232,0.85)",
    shadowColor: "rgba(143,28,232,0.35)",
    colSpan: "col-span-12 lg:col-span-7",
  },
  {
    id: "marketing",
    title: "Marketing",
    sentence: "Targeted digital campaigns and creative strategies that build strong brand loyalty.",
    icon: Megaphone,
    color: "#D20ACD",
    bgGradient: "linear-gradient(135deg, rgba(210,10,205,0.30) 0%, rgba(210,10,205,0.10) 55%, rgba(22,10,22,0.95) 100%)",
    borderColor: "rgba(210,10,205,0.30)",
    hoverBorderColor: "rgba(210,10,205,0.85)",
    shadowColor: "rgba(210,10,205,0.35)",
    colSpan: "col-span-12 lg:col-span-5",
  },
  {
    id: "event-operations",
    title: "Event Operations",
    sentence: "End-to-end planning, stage management, and technical logistics for high-turnout live events.",
    icon: Sliders,
    color: "#7A16D9",
    bgGradient: "linear-gradient(135deg, rgba(122,22,217,0.30) 0%, rgba(122,22,217,0.10) 55%, rgba(16,10,24,0.95) 100%)",
    borderColor: "rgba(122,22,217,0.30)",
    hoverBorderColor: "rgba(122,22,217,0.85)",
    shadowColor: "rgba(122,22,217,0.35)",
    colSpan: "col-span-12 lg:col-span-5",
  },
  {
    id: "full-scale-pr",
    title: "Full-Scale PR",
    sentence: "Media coverage, creator partnerships, and cultural storytelling that keep your brand in the spotlight.",
    icon: Radio,
    color: "#E040FB",
    bgGradient: "linear-gradient(135deg, rgba(224,64,251,0.30) 0%, rgba(224,64,251,0.10) 55%, rgba(24,10,26,0.95) 100%)",
    borderColor: "rgba(224,64,251,0.30)",
    hoverBorderColor: "rgba(224,64,251,0.85)",
    shadowColor: "rgba(224,64,251,0.35)",
    colSpan: "col-span-12 lg:col-span-7",
  },
];

export const CapabilitiesCards: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8 w-full">
      {capabilities.map((item, idx) => {
        const IconComponent = item.icon;
        const isHovered = hoveredId === item.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setHoveredId(isHovered ? null : item.id)}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 sm:p-10 transition-all duration-500 cursor-pointer min-h-[240px] sm:min-h-[270px] ${item.colSpan}`}
            style={{
              background: item.bgGradient,
              border: `1px solid ${isHovered ? item.hoverBorderColor : item.borderColor}`,
              boxShadow: isHovered
                ? `0 20px 50px ${item.shadowColor}, inset 0 1px 0 0 rgba(255,255,255,0.2)`
                : `inset 0 1px 0 0 rgba(255,255,255,0.08)`,
            }}
          >
            {/* Ambient Lighting Glow Matching Card Icon Color */}
            <div
              className="pointer-events-none absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 rounded-3xl"
              style={{ background: item.color, opacity: isHovered ? 0.22 : 0 }}
            />

            {/* Top Bar: Matching Glowing Icon */}
            <div className="mb-8 flex items-center">
              {/* Card Icon matching the card background */}
              <div
                className="relative flex items-center justify-center h-14 w-14 rounded-2xl border p-3.5 backdrop-blur-xl transition-all duration-500 group-hover:scale-110 shadow-lg"
                style={{
                  background: `${item.color}25`,
                  borderColor: item.borderColor,
                }}
              >
                <IconComponent
                  className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6"
                  style={{ color: item.color }}
                />
                <div
                  className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `${item.color}40` }}
                />
              </div>
            </div>

            {/* Bottom Content: Title & Revealed Sentence on Hover */}
            <div className="mt-auto">
              <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white transition-colors duration-300">
                {item.title}
              </h3>

              {/* Simple Sentence: Revealed smoothly when hovered */}
              <div
                className={`grid transition-all duration-400 ease-out ${
                  isHovered
                    ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/15"
                    : "grid-rows-[0fr] opacity-0 mt-0 border-t border-transparent"
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <p className="font-outfit text-sm sm:text-base text-[#E6E7EB] leading-relaxed">
                    {item.sentence}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
