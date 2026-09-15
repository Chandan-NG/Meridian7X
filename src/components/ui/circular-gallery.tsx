import React, { useState, useEffect, useRef, type HTMLAttributes } from 'react';
import { MapPin, Calendar } from 'lucide-react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define the type for a single gallery item supporting both original and event metadata
export interface GalleryItem {
  // Original props
  common?: string;
  binomial?: string;
  photo?: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
  // Event card metadata
  eventName?: string;
  place?: string;
  monthYear?: string;
  image?: string;
  tag?: string;
}

// Define the props for the CircularGallery component
export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Height of individual card in pixels */
  cardHeight?: number;
  /** Width of individual card in pixels */
  cardWidth?: number;
  /** Optional controlled rotation angle in degrees (e.g. from pinned scroll progress) */
  rotation?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      cardHeight = 400,
      cardWidth = 300,
      rotation: controlledRotation,
      ...props
    },
    ref
  ) => {
    const [internalRotation, setInternalRotation] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const [currentRadius, setCurrentRadius] = useState(radius);
    const [currentCardWidth, setCurrentCardWidth] = useState(cardWidth);
    const [currentCardHeight, setCurrentCardHeight] = useState(cardHeight);

    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startDragOffsetRef = useRef(0);

    // Responsive radius & card geometry calculation
    useEffect(() => {
      const updateDimensions = () => {
        if (typeof window !== 'undefined') {
          const width = window.innerWidth;
          if (width < 480) {
            setCurrentRadius(Math.min(radius * 0.55, 260));
            setCurrentCardWidth(Math.min(cardWidth, width - 60));
            setCurrentCardHeight(Math.min(cardHeight, 330));
          } else if (width < 640) {
            setCurrentRadius(Math.min(radius * 0.65, 320));
            setCurrentCardWidth(Math.min(cardWidth, 260));
            setCurrentCardHeight(Math.min(cardHeight, 350));
          } else if (width < 1024) {
            setCurrentRadius(Math.min(radius * 0.85, 460));
            setCurrentCardWidth(Math.min(cardWidth, 280));
            setCurrentCardHeight(Math.min(cardHeight, 380));
          } else {
            setCurrentRadius(radius);
            setCurrentCardWidth(cardWidth);
            setCurrentCardHeight(cardHeight);
          }
        }
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, [radius, cardWidth, cardHeight]);

    // Effect to handle scroll-based rotation (only if rotation is not externally controlled)
    useEffect(() => {
      if (controlledRotation !== undefined) return;

      const handleScroll = () => {
        setIsInteracting(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setInternalRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsInteracting(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [controlledRotation]);

    // Effect for auto-rotation when not actively interacting (only if not controlled)
    useEffect(() => {
      if (controlledRotation !== undefined) return;

      const autoRotate = () => {
        if (!isInteracting && !isDraggingRef.current) {
          setInternalRotation((prev) => (prev + autoRotateSpeed) % 360);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [controlledRotation, isInteracting, autoRotateSpeed]);

    // Pointer drag handlers for intuitive touch & mouse rotation
    const handlePointerDown = (e: React.PointerEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      startXRef.current = e.clientX;
      startDragOffsetRef.current = dragOffset;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      const deltaAngle = (deltaX / window.innerWidth) * 180;
      setDragOffset(startDragOffsetRef.current + deltaAngle);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch if pointer was not captured
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 300);
    };

    const anglePerItem = items.length > 0 ? 360 / items.length : 0;
    const effectiveRotation =
      (controlledRotation !== undefined ? controlledRotation : internalRotation) + dragOffset;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing",
          className
        )}
        style={{ perspective: '2000px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${effectiveRotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = effectiveRotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
            );
            // Dynamic opacity based on distance from front
            const opacity = Math.max(0.25, 1 - normalizedAngle / 160);

            // Metadata extraction (supporting both event & original formats)
            const title = item.eventName || item.common || 'Event';
            const location = item.place || item.binomial || '';
            const date = item.monthYear || '';
            const imageUrl = item.image || item.photo?.url || '';
            const altText = item.photo?.text || title;
            const isFrontCard = normalizedAngle < 40;

            return (
              <div
                key={imageUrl || i}
                role="group"
                aria-label={title}
                className="absolute"
                style={{
                  width: `${currentCardWidth}px`,
                  height: `${currentCardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${currentRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${currentCardWidth / 2}px`,
                  marginTop: `-${currentCardHeight / 2}px`,
                  opacity: opacity,
                  transition: isDraggingRef.current
                    ? 'opacity 0.1s linear'
                    : 'opacity 0.3s linear, filter 0.3s ease',
                  filter: isFrontCard ? 'drop-shadow(0 0 30px rgba(143,28,232,0.35))' : 'none',
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/20 bg-[#111116]/85 backdrop-blur-xl transition-all duration-300 hover:border-[#deb7ff]/80">
                  {/* Event Cover Image */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={altText}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: item.photo?.pos || 'center' }}
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#8F1CE8]/30 via-[#111116] to-[#D20ACD]/30" />
                  )}

                  {/* Cyber Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                  {/* Top Badge: Event Category Only */}
                  {item.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center font-mono-telemetry text-[11px] font-bold tracking-wider text-[#ffade2] uppercase px-3 py-1 rounded-full border border-[#D20ACD]/40 bg-[#D20ACD]/25 backdrop-blur-md shadow-md">
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* Bottom Content: Event Name, Place, and Month/Year */}
                  <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 text-white z-10 flex flex-col">
                    {/* Event Name */}
                    <h3 className="font-syne text-xl sm:text-2xl font-extrabold uppercase tracking-tight leading-snug drop-shadow-md group-hover:text-[#deb7ff] transition-colors duration-300 mb-3">
                      {title}
                    </h3>

                    {/* Metadata: Place and Month / Year */}
                    <div className="flex flex-col gap-1.5 pt-3 border-t border-white/15">
                      {location && (
                        <div className="flex items-center gap-2 text-[#C9CBD2]">
                          <MapPin className="h-3.5 w-3.5 text-[#D20ACD] shrink-0" />
                          <span className="font-outfit text-xs sm:text-sm font-medium tracking-wide truncate">
                            {location}
                          </span>
                        </div>
                      )}

                      {date && (
                        <div className="flex items-center gap-2 text-[#deb7ff]">
                          <Calendar className="h-3.5 w-3.5 text-[#deb7ff] shrink-0" />
                          <span className="font-mono-telemetry text-xs font-bold tracking-widest uppercase">
                            {date}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Original credit if provided */}
                    {item.photo?.by && !location && (
                      <p className="font-outfit text-xs mt-2 text-[#A7A7B0]">
                        Photo by: {item.photo.by}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
export default CircularGallery;
