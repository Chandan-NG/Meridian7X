import React, { useState, useEffect, useRef } from "react";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { majorEventsData } from "@/data/events";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const EventsCircularShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  const totalCards = majorEventsData.length;
  const anglePerCard = 360 / totalCards; // 45 deg
  const targetRotation = -currentIndex * anglePerCard;

  // Intercept wheel scroll while inside the section until 1 full round is completed
  useEffect(() => {
    const COOLDOWN_MS = 280; // Smooth cooldown between card steps

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();

      // Section is considered entered when its top is near top of viewport (rect.top <= 120)
      // and its bottom is still well within viewport (rect.bottom >= 350)
      const isInFocus = rect.top <= 120 && rect.bottom >= 350;
      if (!isInFocus) return;

      const now = Date.now();
      const delta = e.deltaY;

      // Scrolling DOWN
      if (delta > 15) {
        if (currentIndexRef.current < totalCards) {
          // Consume scroll for card rotation
          e.preventDefault();
          if (now - lastScrollTimeRef.current > COOLDOWN_MS) {
            lastScrollTimeRef.current = now;
            setCurrentIndex((prev) => {
              const next = Math.min(prev + 1, totalCards);
              currentIndexRef.current = next;
              return next;
            });
          }
        }
        // When currentIndex reaches totalCards (1 full round completed),
        // e.preventDefault() is NOT called, so the home page scroll continues down naturally!
      } else if (delta < -15) {
        // Scrolling UP
        if (currentIndexRef.current > 0) {
          // Consume scroll for reverse card rotation
          e.preventDefault();
          if (now - lastScrollTimeRef.current > COOLDOWN_MS) {
            lastScrollTimeRef.current = now;
            setCurrentIndex((prev) => {
              const next = Math.max(prev - 1, 0);
              currentIndexRef.current = next;
              return next;
            });
          }
        }
        // When currentIndex reaches 0 (at start),
        // e.preventDefault() is NOT called, so the home page scroll continues up naturally!
      }
    };

    // Reset to start if user scrolls far above the section
    const handleScrollCheck = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        currentIndexRef.current = 0;
        setCurrentIndex(0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScrollCheck, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScrollCheck);
    };
  }, [totalCards]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      currentIndexRef.current = next;
      return next;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = Math.min(prev + 1, totalCards);
      currentIndexRef.current = next;
      return next;
    });
  };

  const handleSelectDot = (idx: number) => {
    setCurrentIndex(idx);
    currentIndexRef.current = idx;
  };

  const activeCardDot = currentIndex % totalCards;

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto flex flex-col items-center select-none"
    >
      {/* Ambient Cyber-Luxury Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] bg-gradient-to-r from-[#8F1CE8]/20 via-[#D20ACD]/20 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 shrink-0">
        <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white mb-6">
          Our <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#deb7ff] via-[#cf01ca] to-[#ffade2] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(207,1,202,0.4)]">
            Impact
          </span>
        </h2>

        <p className="font-outfit text-base sm:text-lg text-[#C9CBD2] leading-relaxed max-w-2xl mx-auto">
          Some of the major events we have organized till date.
        </p>
      </div>

      {/* 3D Cylindrical Gallery Carousel */}
      <div className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] flex items-center justify-center overflow-hidden">
        <CircularGallery
          items={majorEventsData}
          rotation={targetRotation}
          radius={540}
          cardWidth={290}
          cardHeight={390}
          className="w-full h-full"
        />
      </div>

      {/* Subtle Controls & Progress Indicator */}
      <div className="flex items-center gap-3 sm:gap-4 mt-8 z-10">
        {/* Previous Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous event card"
          className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
            currentIndex === 0
              ? "border-white/10 text-white/20 cursor-not-allowed"
              : "border-white/25 text-white/80 hover:text-white hover:border-[#8F1CE8] hover:shadow-[0_0_15px_rgba(143,28,232,0.4)] cursor-pointer"
          } bg-[#111116]/80 backdrop-blur-xl`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* 8 Event Progress Indicator Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
          {majorEventsData.map((event, idx) => {
            const isActive = idx === activeCardDot;
            return (
              <button
                key={event.eventName || idx}
                onClick={() => handleSelectDot(idx)}
                aria-label={`Jump to event ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-6 h-2 bg-gradient-to-r from-[#deb7ff] to-[#D20ACD] shadow-[0_0_8px_#D20ACD]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>

        {/* Next Arrow Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= totalCards}
          aria-label="Next event card"
          className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
            currentIndex >= totalCards
              ? "border-white/10 text-white/20 cursor-not-allowed"
              : "border-white/25 text-white/80 hover:text-white hover:border-[#D20ACD] hover:shadow-[0_0_15px_rgba(210,10,205,0.4)] cursor-pointer"
          } bg-[#111116]/80 backdrop-blur-xl`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default EventsCircularShowcase;
