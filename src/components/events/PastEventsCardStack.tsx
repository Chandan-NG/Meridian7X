import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { CardStack } from "@/components/ui/card-stack";
import { top7PastEvents, type PastEvent } from "@/data/pastEvents";
import { cn } from "@/lib/utils";

// Official upright Google Drive Logo (Points upwards)
const GoogleDriveIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 87.3 78" className={className} aria-hidden="true">
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA"/>
    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00AC47"/>
    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l9.25-16c.8-1.4 1.2-2.95 1.2-4.5H59.8l13.75 23.8z" fill="#EA4335"/>
    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832D"/>
    <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684FC"/>
    <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#FFBA00"/>
  </svg>
);

export const PastEventsCardStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({
    cardWidth: 540,
    cardHeight: 360,
    spreadDeg: 46,
    overlap: 0.46,
  });

  // Responsive sizing configuration for 3D card fan geometry
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setDimensions({
          cardWidth: Math.min(320, width - 40),
          cardHeight: 400,
          spreadDeg: 28,
          overlap: 0.58,
        });
      } else if (width < 768) {
        setDimensions({
          cardWidth: Math.min(420, width - 60),
          cardHeight: 380,
          spreadDeg: 36,
          overlap: 0.52,
        });
      } else if (width < 1024) {
        setDimensions({
          cardWidth: 480,
          cardHeight: 360,
          spreadDeg: 42,
          overlap: 0.48,
        });
      } else {
        setDimensions({
          cardWidth: 540,
          cardHeight: 360,
          spreadDeg: 46,
          overlap: 0.46,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* 21st.dev Card Stack 3D Carousel */}
      <CardStack<PastEvent>
        items={top7PastEvents}
        activeIndex={activeIndex}
        onChangeIndex={(idx) => setActiveIndex(idx)}
        cardWidth={dimensions.cardWidth}
        cardHeight={dimensions.cardHeight}
        spreadDeg={dimensions.spreadDeg}
        overlap={dimensions.overlap}
        perspectivePx={1200}
        depthPx={130}
        tiltXDeg={10}
        activeLiftPx={24}
        activeScale={1.03}
        inactiveScale={0.93}
        loop={true}
        showDots={true}
        className="my-4"
        renderCard={(event, { active }) => (
          <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#0b0b12] border border-white/15 group shadow-2xl">
            {/* Event Background Image */}
            <img
              src={event.imageSrc}
              alt={event.eventName}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                active
                  ? "scale-105 filter brightness-95"
                  : "scale-100 filter brightness-60 contrast-110"
              )}
              draggable={false}
              loading="eager"
            />

            {/* Cyber-Luxury Gradient Overlay */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                active
                  ? "bg-gradient-to-t from-black via-black/60 to-black/25"
                  : "bg-gradient-to-t from-black/95 via-black/75 to-black/40"
              )}
            />

            {/* Top Bar inside Card: Event Category only */}
            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-start">
              <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#deb7ff] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md">
                {event.tag}
              </span>
            </div>

            {/* Bottom Content inside Card: Event Title, Location, Date, & Button */}
            <div className="relative z-10 mt-auto p-5 sm:p-7 flex flex-col justify-end">
              {/* Event Title */}
              <h3 className="font-syne text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-lg">
                {event.eventName}
              </h3>

              {/* Date and Location */}
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/90 font-outfit">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#deb7ff] shrink-0" />
                  <span>{event.monthYear}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#cf01ca] shrink-0" />
                  <span className="line-clamp-1">{event.place}, {event.city}</span>
                </div>
              </div>

              {/* ACTION BUTTON: View Event Photos */}
              {active && (
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-start">
                  <a
                    href={event.driveFolderUrl || "#"}
                    target={event.driveFolderUrl && event.driveFolderUrl !== "#" ? "_blank" : undefined}
                    rel={event.driveFolderUrl && event.driveFolderUrl !== "#" ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!event.driveFolderUrl || event.driveFolderUrl === "#") {
                        e.preventDefault();
                      }
                    }}
                    className="group/btn relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 bg-gradient-to-r from-[#8F1CE8] via-[#cf01ca] to-[#8F1CE8] bg-[length:200%_auto] hover:bg-right font-syne text-xs uppercase tracking-wider font-bold text-white shadow-[0_0_20px_rgba(207,1,202,0.45)] hover:shadow-[0_0_30px_rgba(207,1,202,0.75)] transition-all duration-300 hover:scale-[1.03] active:scale-95 border border-white/30 cursor-pointer"
                  >
                    <GoogleDriveIcon className="h-4 w-4 shrink-0" />
                    <span>View Event Photos</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/90 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PastEventsCardStack;
