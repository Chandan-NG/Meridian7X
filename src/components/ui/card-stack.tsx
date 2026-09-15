import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Memoized spring config to prevent object recreation
const createSpringTransition = (stiffness: number, damping: number) => ({
  type: "spring" as const,
  stiffness,
  damping,
});

// Stable drag constraints
const DRAG_CONSTRAINTS = { left: 0, right: 0 } as const;

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
  [key: string]: any;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** External state control (optional) */
  activeIndex?: number;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean; index: number }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

/** Memoized individual card - prevents re-renders when sibling cards change */
type StackCardProps<T extends CardStackItem> = {
  item: T;
  index: number;
  isActive: boolean;
  cardWidth: number;
  cardHeight: number;
  x: number;
  y: number;
  z: number;
  lift: number;
  rotateX: number;
  rotateZ: number;
  scale: number;
  zIndex: number;
  reduceMotion: boolean | null;
  springTransition: { type: "spring"; stiffness: number; damping: number };
  handleDragEnd: (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => void;
  onSelect: (index: number) => void;
  renderCard?: (item: T, state: { active: boolean; index: number }) => React.ReactNode;
};

const StackCard = React.memo(function StackCard<T extends CardStackItem>({
  item,
  index,
  isActive,
  cardWidth,
  cardHeight,
  x,
  y,
  z,
  lift,
  rotateX,
  rotateZ,
  scale,
  zIndex,
  reduceMotion,
  springTransition,
  handleDragEnd,
  onSelect,
  renderCard,
}: StackCardProps<T>) {
  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      // If user clicked inside an interactive button/link, don't trigger selection override
      const target = e.target as HTMLElement | null;
      if (target?.closest("a") || target?.closest("button")) {
        return;
      }
      onSelect(index);
    },
    [onSelect, index],
  );

  return (
    <motion.div
      className={cn(
        "absolute bottom-0 rounded-3xl border border-white/15 dark:border-white/15 overflow-hidden shadow-2xl",
        "will-change-transform select-none",
        isActive
          ? "cursor-grab active:cursor-grabbing border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(143,28,232,0.35)]"
          : "cursor-pointer border-white/10 hover:border-white/25",
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: y + 40,
              x,
              rotateZ,
              rotateX,
              scale,
            }
      }
      animate={{
        opacity: 1,
        x,
        y: y + lift,
        rotateZ,
        rotateX,
        scale,
      }}
      transition={springTransition}
      onClick={handleClick}
      drag={isActive ? "x" : false}
      dragConstraints={isActive ? DRAG_CONSTRAINTS : undefined}
      dragElastic={isActive ? 0.18 : undefined}
      onDragEnd={isActive ? handleDragEnd : undefined}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `translateZ(${z}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {renderCard ? (
          renderCard(item, { active: isActive, index })
        ) : (
          <DefaultFanCard item={item} />
        )}
      </div>
    </motion.div>
  );
}) as <T extends CardStackItem>(props: StackCardProps<T>) => React.ReactElement;

/** Memoized default card content */
const DefaultFanCard = React.memo(function DefaultFanCard({
  item,
}: {
  item: CardStackItem;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c0c14]">
      {/* Image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-sm text-zinc-400">
            No image
          </div>
        )}
      </div>

      {/* Subtle gradient overlay at bottom for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <div className="truncate text-xl font-bold font-syne text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm font-outfit text-zinc-300">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,

  cardWidth = 520,
  cardHeight = 340,

  overlap = 0.48,
  spreadDeg = 48,

  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,

  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,

  springStiffness = 280,
  springDamping = 28,

  loop = true,
  autoAdvance = false,
  intervalMs = 3200,
  pauseOnHover = true,

  showDots = true,
  className,

  activeIndex: controlledIndex,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [internalActive, setInternalActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  const isControlled = controlledIndex !== undefined;
  const active = isControlled ? wrapIndex(controlledIndex, len) : internalActive;

  const setActive = React.useCallback(
    (updater: number | ((prev: number) => number)) => {
      if (isControlled) {
        const nextVal =
          typeof updater === "function" ? updater(active) : updater;
        onChangeIndex?.(nextVal, items[nextVal]!);
      } else {
        setInternalActive((curr) => {
          const nextVal =
            typeof updater === "function" ? updater(curr) : updater;
          return nextVal;
        });
      }
    },
    [isControlled, active, items, onChangeIndex],
  );

  // Keep active in bounds if items change
  React.useEffect(() => {
    if (!isControlled) {
      setInternalActive((a) => wrapIndex(a, len));
    }
  }, [len, isControlled]);

  React.useEffect(() => {
    if (!len) return;
    if (!isControlled) {
      onChangeIndex?.(active, items[active]!);
    }
  }, [active, len, isControlled, items, onChangeIndex]);

  // Memoize computed geometry values
  const { maxOffset, cardSpacing, stepDeg } = React.useMemo(() => {
    const half = Math.max(1, Math.floor(maxVisible / 2));
    return {
      maxOffset: Math.max(0, Math.floor(maxVisible / 2)),
      cardSpacing: Math.max(10, Math.round(cardWidth * (1 - overlap))),
      stepDeg: spreadDeg / half,
    };
  }, [maxVisible, cardWidth, overlap, spreadDeg]);

  // Memoize spring transition
  const springTransition = React.useMemo(
    () => createSpringTransition(springStiffness, springDamping),
    [springStiffness, springDamping],
  );

  const prev = React.useCallback(() => {
    if (!len) return;
    setActive((a) => (loop || a > 0 ? wrapIndex(a - 1, len) : a));
  }, [loop, len, setActive]);

  const next = React.useCallback(() => {
    if (!len) return;
    setActive((a) => (loop || a < len - 1 ? wrapIndex(a + 1, len) : a));
  }, [loop, len, setActive]);

  // Memoized keyboard handler
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [prev, next],
  );

  // Memoized drag end handler
  const handleDragEnd = React.useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (reduceMotion) return;
      const travel = info.offset.x;
      const v = info.velocity.x;
      const threshold = Math.min(160, cardWidth * 0.22);

      if (travel > threshold || v > 650) prev();
      else if (travel < -threshold || v < -650) next();
    },
    [reduceMotion, cardWidth, prev, next],
  );

  // Autoplay
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(() => {
      setActive((a) => (loop || a < len - 1 ? wrapIndex(a + 1, len) : a));
    }, Math.max(700, intervalMs));

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    setActive,
  ]);

  if (!len) return null;

  return (
    <div
      className={cn("w-full flex flex-col items-center", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* 3D Stage */}
      <div
        className="relative w-full overflow-visible flex items-end justify-center"
        style={{ height: Math.max(380, cardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="3D Card Stack Carousel"
      >
        {/* Ambient glow highlights behind stack */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-gradient-to-r from-[#8F1CE8]/20 via-[#D20ACD]/20 to-transparent blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/50 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              // Fan geometry
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;

              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              return (
                <StackCard
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={isActive}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  x={x}
                  y={y}
                  z={z}
                  lift={lift}
                  rotateX={rotateX}
                  rotateZ={rotateZ}
                  scale={scale}
                  zIndex={zIndex}
                  reduceMotion={reduceMotion}
                  springTransition={springTransition}
                  handleDragEnd={handleDragEnd}
                  onSelect={setActive}
                  renderCard={renderCard}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots Navigation with integrated arrow switchers */}
      {showDots ? (
        <div className="mt-8 flex items-center justify-center gap-3 z-10">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/15 bg-[#111116]/90 backdrop-blur-xl shadow-lg">
            <button
              onClick={prev}
              aria-label="Previous card"
              className="h-7 w-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 px-1">
              {items.map((it, idx) => {
                const on = idx === active;
                return (
                  <button
                    key={it.id}
                    onClick={() => setActive(idx)}
                    className={cn(
                      "transition-all duration-300 rounded-full cursor-pointer",
                      on
                        ? "w-6 h-2 bg-gradient-to-r from-[#deb7ff] to-[#D20ACD] shadow-[0_0_10px_#D20ACD]"
                        : "w-2 h-2 bg-white/25 hover:bg-white/50",
                    )}
                    aria-label={`Go to ${it.title}`}
                  />
                );
              })}
            </div>

            <button
              onClick={next}
              aria-label="Next card"
              className="h-7 w-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CardStack;
