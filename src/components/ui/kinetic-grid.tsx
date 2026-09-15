import React, { useRef, useEffect, useCallback } from "react";

export interface KineticGridProps {
  gridSize?: number;
  interactionRadius?: number;
  attractionStrength?: number;
  className?: string;
  dotColor?: string;
  activeDotColor?: string;
  lineColor?: string;
  activeLineColor?: string;
  showCircle?: boolean;
}

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
  wavelength: number;
}

export const KineticGrid: React.FC<KineticGridProps> = ({
  gridSize = 40,
  interactionRadius = 180,
  attractionStrength = 0.5,
  className = "",
  dotColor = "rgba(255, 255, 255, 0.18)",
  activeDotColor = "#8F1CE8",
  lineColor = "rgba(255, 255, 255, 0.07)",
  activeLineColor = "rgba(143, 28, 232, 0.35)",
  showCircle = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const ripplesRef = useRef<Ripple[]>([]);
  const pointsRef = useRef<Point[][]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Initialize or resize points
  const initGrid = useCallback((width: number, height: number) => {
    const cols = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;
    const offsetX = (width - (cols - 1) * gridSize) / 2;
    const offsetY = (height - (rows - 1) * gridSize) / 2;

    const grid: Point[][] = [];
    for (let r = 0; r < rows; r++) {
      const rowPoints: Point[] = [];
      for (let c = 0; c < cols; c++) {
        const ox = offsetX + c * gridSize;
        const oy = offsetY + r * gridSize;
        rowPoints.push({
          x: ox,
          y: oy,
          originX: ox,
          originY: oy,
          vx: 0,
          vy: 0,
        });
      }
      grid.push(rowPoints);
    }
    pointsRef.current = grid;
  }, [gridSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initGrid(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      ripplesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.8,
        speed: 10,
        amplitude: 24,
        wavelength: 70,
      });
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const points = pointsRef.current;
      const ripples = ripplesRef.current;

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Calculate new target positions with physics
      const rows = points.length;
      if (rows === 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }
      const cols = points[0].length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          let targetX = p.originX;
          let targetY = p.originY;

          // 1. Mouse attraction deformation
          if (mouse.active) {
            const dx = mouse.x - p.originX;
            const dy = mouse.y - p.originY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactionRadius && dist > 0.001) {
              const norm = dist / interactionRadius;
              // Cosine easing creates a soft warping curve towards the pointer
              const pull = Math.cos(norm * (Math.PI / 2)) * attractionStrength * 40;
              targetX += (dx / dist) * pull;
              targetY += (dy / dist) * pull;
            }
          }

          // 2. Ripple displacement
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i];
            const rdx = p.originX - rip.x;
            const rdy = p.originY - rip.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);

            const diff = rdist - rip.radius;
            if (Math.abs(diff) < rip.wavelength && rdist > 0.001) {
              const decay = 1 - rip.radius / rip.maxRadius;
              const wave =
                Math.sin((diff / rip.wavelength) * Math.PI) * rip.amplitude * decay;
              targetX += (rdx / rdist) * wave;
              targetY += (rdy / rdist) * wave;
            }
          }

          // Spring damping interpolation
          p.x += (targetX - p.x) * 0.18;
          p.y += (targetY - p.y) * 0.18;
        }
      }

      // Draw Grid Lines (Horizontal & Vertical)
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Horizontal connection
          if (c < cols - 1) {
            const rightP = points[r][c + 1];
            const midX = (p.x + rightP.x) / 2;
            const midY = (p.y + rightP.y) / 2;
            const distToMouse = mouse.active
              ? Math.hypot(mouse.x - midX, mouse.y - midY)
              : 9999;

            ctx.strokeStyle =
              distToMouse < interactionRadius ? activeLineColor : lineColor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(rightP.x, rightP.y);
            ctx.stroke();
          }

          // Vertical connection
          if (r < rows - 1) {
            const bottomP = points[r + 1][c];
            const midX = (p.x + bottomP.x) / 2;
            const midY = (p.y + bottomP.y) / 2;
            const distToMouse = mouse.active
              ? Math.hypot(mouse.x - midX, mouse.y - midY)
              : 9999;

            ctx.strokeStyle =
              distToMouse < interactionRadius ? activeLineColor : lineColor;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(bottomP.x, bottomP.y);
            ctx.stroke();
          }
        }
      }

      // Draw Grid Dots
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          const distToMouse = mouse.active
            ? Math.hypot(mouse.x - p.x, mouse.y - p.y)
            : 9999;

          const isNearMouse = distToMouse < interactionRadius;
          const radius = isNearMouse
            ? 1.5 + (1 - distToMouse / interactionRadius) * 2.2
            : 1.2;

          ctx.fillStyle = isNearMouse ? activeDotColor : dotColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle photonic bloom on points closest to cursor
          if (isNearMouse && distToMouse < interactionRadius * 0.5) {
            ctx.save();
            ctx.fillStyle = "rgba(210, 10, 205, 0.45)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // Draw Cursor Influence Circle Ring (as in satoriui preview)
      if (showCircle && mouse.active) {
        ctx.save();
        ctx.strokeStyle = "rgba(143, 28, 232, 0.22)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, interactionRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner soft glow
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          interactionRadius
        );
        glow.addColorStop(0, "rgba(143, 28, 232, 0.12)");
        glow.addColorStop(0.7, "rgba(210, 10, 205, 0.05)");
        glow.addColorStop(1, "rgba(143, 28, 232, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, interactionRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [
    initGrid,
    gridSize,
    interactionRadius,
    attractionStrength,
    dotColor,
    activeDotColor,
    lineColor,
    activeLineColor,
    showCircle,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 block h-full w-full pointer-events-auto touch-pan-y ${className}`}
    />
  );
};
