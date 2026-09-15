import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface SlideTabsProps {
  tabs?: string[];
  selectedIndex?: number;
  onSelect?: (index: number, tab: string) => void;
  className?: string;
  cursorClassName?: string;
  tabClassName?: string;
}

export const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs = ["Home", "Pricing", "Features", "Docs", "Blog"],
  selectedIndex,
  onSelect,
  className = "",
  cursorClassName = "",
  tabClassName = "",
}) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  // State to track the currently selected tab, defaulting to the first tab (index 0)
  const [selected, setSelected] = useState(selectedIndex ?? 0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setSelected(selectedIndex);
    }
  }, [selectedIndex]);

  // This effect runs when the component mounts or when the selected tab changes.
  // It calculates the position of the selected tab and sets the cursor.
  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected, tabs]);

  const handleTabClick = (i: number) => {
    setSelected(i);
    if (onSelect) {
      onSelect(i, tabs[i]);
    }
  };

  return (
    <ul
      onMouseLeave={() => {
        // When the mouse leaves the container, reset the cursor
        // to the position of the currently selected tab.
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className={`relative mx-auto flex w-fit items-center rounded-full border border-white/15 bg-white/[0.04] p-1 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] ${className}`}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => handleTabClick(i)}
          className={tabClassName}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} className={cursorClassName} />
    </ul>
  );
};

// The Tab component is wrapped in forwardRef to accept a ref from its parent.
interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  onClick: () => void;
  className?: string;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick, className = "" }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => {
          if (!ref || typeof ref === "function" || !ref.current) return;

          const { width } = ref.current.getBoundingClientRect();

          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className={`relative z-10 block cursor-pointer px-3.5 py-1.5 font-outfit text-xs font-semibold uppercase tracking-wider text-[#C9CBD2] hover:text-white transition-colors duration-200 md:px-5 md:py-2 md:text-sm ${className}`}
      >
        {children}
      </li>
    );
  }
);

Tab.displayName = "Tab";

interface CursorProps {
  position: { left: number; width: number; opacity: number };
  className?: string;
}

const Cursor: React.FC<CursorProps> = ({ position, className = "" }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 32,
      }}
      className={`absolute z-0 h-7 rounded-full bg-gradient-to-r from-[#7A16D9] via-[#8F1CE8] to-[#D20ACD] shadow-[0_0_20px_rgba(143,28,232,0.5)] md:h-9 ${className}`}
    />
  );
};
