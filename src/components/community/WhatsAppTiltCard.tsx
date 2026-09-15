import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/social-icons";
import { cn } from "@/lib/utils";

export interface WhatsAppTiltCardProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  actionText?: string;
  whatsappMessage?: string;
  href?: string;
  className?: string;
}

export const WhatsAppTiltCard = React.forwardRef<HTMLDivElement, WhatsAppTiltCardProps>(
  (
    {
      title = "WhatsApp Community",
      subtitle = "Official Network • 10K+ Members",
      imageUrl = "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
      actionText = "Join WhatsApp Community",
      whatsappMessage: _whatsappMessage,
      href,
      className,
    },
    ref
  ) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseSpringConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, mouseSpringConfig);
    const springY = useSpring(y, mouseSpringConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const targetUrl = href || "#";

    return (
      <div
        style={{ perspective: "1000px" }}
        className="w-full flex items-center justify-center py-4"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "relative h-[27rem] sm:h-[29rem] w-80 sm:w-[22rem] rounded-2xl bg-[#0a0a0f]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/20 transition-[border-color,box-shadow] duration-300 hover:border-[#25D366]/60 hover:shadow-[0_25px_60px_rgba(37,211,102,0.3)]",
            className
          )}
        >
          <div
            style={{
              transform: "translateZ(50px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] grid-rows-[1fr_auto] rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Background Image */}
            <img
              src={imageUrl}
              alt={`${title}, ${subtitle}`}
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-b from-black/60 via-black/25 to-black/85" />

            {/* Content Layer */}
            <div className="relative flex flex-col justify-between rounded-xl p-5 text-white">
              {/* Top Row: Title + Subtitle */}
              <div>
                <motion.h2
                  style={{ transform: "translateZ(50px)" }}
                  className="font-syne text-2xl sm:text-[1.65rem] font-bold text-white tracking-tight leading-snug drop-shadow-md"
                >
                  {title}
                </motion.h2>
                <motion.p
                  style={{ transform: "translateZ(40px)" }}
                  className="mt-1 font-outfit text-xs sm:text-sm font-light text-white/80 leading-relaxed"
                >
                  {subtitle}
                </motion.p>
              </div>

              {/* Bottom Row: Frosted Glass Action Button */}
              <motion.a
                href={targetUrl}
                target={targetUrl !== "#" ? "_blank" : undefined}
                rel={targetUrl !== "#" ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (targetUrl === "#") {
                    e.preventDefault();
                  }
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ transform: "translateZ(40px)" }}
                className={cn(
                  "w-full rounded-lg py-3 text-center font-syne text-xs sm:text-sm uppercase tracking-wider font-semibold text-white transition-all duration-300",
                  "bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/20 hover:bg-[#25D366]/30 hover:ring-[#25D366]/60 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                )}
              >
                <WhatsAppIcon className="h-4 w-4 fill-white" />
                <span>{actionText}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

WhatsAppTiltCard.displayName = "WhatsAppTiltCard";
export default WhatsAppTiltCard;
