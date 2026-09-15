import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CommunityFormTiltCardProps {
  id?: string;
  title: string;
  stats: string;
  imageUrl: string;
  actionText?: string;
  formUrl?: string;
  themeColor: string; // HSL value, e.g. "275 85% 25%"
  className?: string;
}

export const CommunityFormTiltCard: React.FC<CommunityFormTiltCardProps> = ({
  id,
  title,
  stats,
  imageUrl,
  actionText = "Apply Now",
  formUrl = "https://forms.google.com",
  themeColor,
  className,
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Smooth subtle tilt
    setRotateX(-normY * 12);
    setRotateY(normX * 12);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      id={id}
      style={{
        perspective: "1000px",
        "--theme-color": themeColor,
      } as React.CSSProperties}
      className={cn("group w-full h-full flex justify-center", className)}
    >
      <a
        ref={cardRef}
        href={formUrl || "#"}
        target={formUrl && formUrl !== "#" ? "_blank" : undefined}
        rel={formUrl && formUrl !== "#" ? "noopener noreferrer" : undefined}
        onClick={(e) => {
          if (!formUrl || formUrl === "#") {
            e.preventDefault();
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-in-out",
          boxShadow: isHovered
            ? "0 0 60px -15px hsl(var(--theme-color) / 0.7)"
            : "0 0 40px -15px hsl(var(--theme-color) / 0.4)",
        }}
        className="relative block w-full h-full rounded-2xl overflow-hidden cursor-pointer select-none border border-white/15 bg-[#0a0a0f] transition-all duration-500 ease-in-out"
        aria-label={`Open Google Form for ${title}`}
      >
        {/* Background Image with Zoom on Hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Card-21 Signature Themed Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--theme-color) / 0.95), hsl(var(--theme-color) / 0.65) 32%, transparent 65%)",
          }}
        />

        {/* Top Vignette for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Content Area docked at bottom */}
        <div className="relative flex flex-col justify-end h-full p-6 sm:p-7 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-syne">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-white/85 mt-1.5 font-medium font-outfit">
            {stats}
          </p>

          {/* Card-21 Signature Action Button (No icons) */}
          <div className="mt-7 sm:mt-8 flex items-center justify-center text-center bg-[hsl(var(--theme-color)/0.25)] backdrop-blur-md border border-[hsl(var(--theme-color)/0.35)] rounded-xl px-4 py-3 sm:py-3.5 transition-all duration-300 group-hover:bg-[hsl(var(--theme-color)/0.45)] group-hover:border-[hsl(var(--theme-color)/0.6)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <span className="text-xs sm:text-sm font-semibold tracking-wider font-syne uppercase">
              {actionText}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CommunityFormTiltCard;
