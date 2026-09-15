import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EventFlippingCardProps {
  id?: string;
  eventName: string;
  category: string;
  date: string;
  place: string;
  city?: string;
  imageUrl: string;
  description: string;
  buttonText?: string;
  formUrl: string;
  initialFlipped?: boolean;
  className?: string;
}

export const EventFlippingCard: React.FC<EventFlippingCardProps> = ({
  id,
  eventName,
  category,
  date,
  place,
  city,
  imageUrl,
  description,
  buttonText = "Register",
  formUrl,
  initialFlipped = false,
  className,
}) => {
  const [isFlipped, setIsFlipped] = useState(initialFlipped);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      id={id}
      className={cn(
        "group/flipping-card [perspective:1000px] w-full max-w-[340px] sm:max-w-[360px] h-[400px] sm:h-[415px] select-none cursor-pointer",
        className
      )}
      onClick={handleCardClick}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl border border-neutral-800 bg-[#0c0c14] shadow-2xl transition-all duration-700 [transform-style:preserve-3d]",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "group-hover/flipping-card:[transform:rotateY(180deg)]"
        )}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#0c0c14] text-neutral-50 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full flex flex-col p-4">
            {/* Top Framed Image */}
            <img
              src={imageUrl}
              alt={eventName}
              className="w-full h-[185px] sm:h-[190px] object-cover rounded-xl min-h-0 shrink-0"
            />

            {/* Bottom Content Area */}
            <div className="p-2 pt-3 flex flex-col justify-between flex-grow">
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#deb7ff]">
                  {category}
                </span>
                <h3 className="font-syne text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {eventName}
                </h3>
              </div>

              {/* Date and Location (First line: Campus/Location, Second line: City) */}
              <div className="mt-2.5 flex flex-col gap-1.5 text-xs text-[#A7A7B0] font-outfit border-t border-neutral-800/80 pt-2.5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#deb7ff] shrink-0" />
                  <span>{date}</span>
                </div>
                <div className="flex items-start gap-1.5 text-neutral-300">
                  <MapPin className="h-3.5 w-3.5 text-[#cf01ca] shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-white font-medium line-clamp-1">{place}</span>
                    {city && (
                      <span className="text-[11px] text-[#A7A7B0] mt-0.5">
                        {city}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#0c0c14] text-neutral-50 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full flex flex-col items-center justify-center p-6 text-center">
            {/* Single-Liner Paragraph */}
            <p className="font-outfit text-sm sm:text-base text-neutral-300 text-center leading-relaxed max-w-[280px]">
              {description}
            </p>

            {/* Simple Button */}
            <a
              href={formUrl || "#"}
              target={formUrl && formUrl !== "#" ? "_blank" : undefined}
              rel={formUrl && formUrl !== "#" ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                e.stopPropagation();
                if (!formUrl || formUrl === "#") {
                  e.preventDefault();
                }
              }}
              className="mt-6 bg-white text-black px-6 py-2.5 rounded-lg font-syne font-bold text-xs uppercase tracking-wider w-min whitespace-nowrap h-9 flex items-center justify-center hover:bg-[#deb7ff] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFlippingCard;

