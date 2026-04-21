import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import svgPaths from "../imports/Desktop3/svg-ur7t3k75tw";
import { ARKLogoScaled } from "./components/ARKLogo";

// Reusable logo that fills its container width
function ResponsiveLogo({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      <ARKLogoScaled width={width} />
    </div>
  );
}

// Scroll-triggered fade-in wrapper
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const FONT = "font-['HarmonyOS_Sans_SC',sans-serif]";

const NAV_ITEMS = ["Index", "Gallery", "Memo", "About"];

// Mobile fullscreen menu overlay
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#141414] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <motion.button
              onClick={onClose}
              className="text-white"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </motion.button>
          </div>
          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center items-center gap-6 px-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={onClose}
                className={`${FONT} text-white text-[48px] font-black leading-[1.2] hover:opacity-60 transition-opacity`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          {/* Bottom info */}
          <div className="p-6">
            <p className={`${FONT} text-white/50 text-[13px] text-center`}>夏可Ark©2026</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavBar({ sticky = false }: { sticky?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className={`px-[18px] bg-[#e7e4df] z-50 ${sticky ? "sticky top-0" : ""}`}>
        <div className="flex justify-between items-center py-2 border-b border-[#141414]">
          <p className={`${FONT} text-[#141414] text-[13px] md:text-[15px]`}>
            All about Dr.Shark
          </p>

          {/* Desktop: full nav links */}
          <div className="hidden md:flex gap-1 items-center">
            {NAV_ITEMS.map((item, i) => (
              <span key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`${FONT} text-[#141414] text-[15px] hover:opacity-60 transition-opacity`}
                >
                  {item}
                </a>
                {i < NAV_ITEMS.length - 1 && (
                  <span className={`${FONT} text-[#141414] text-[15px] mx-1`}>/</span>
                )}
              </span>
            ))}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-[20px] h-[1.5px] bg-[#141414]" />
            <span className="block w-[20px] h-[1.5px] bg-[#141414]" />
            <span className="block w-[20px] h-[1.5px] bg-[#141414]" />
          </button>

          <p className={`${FONT} text-[#141414] text-[13px] md:text-[15px] hidden md:block`}>
            夏可Ark©2026
          </p>
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [smallLogoScale, setSmallLogoScale] = useState(1);

  useEffect(() => {
    if (!heroRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const scale = Math.min(1, w / 1500);
        setSmallLogoScale(scale);
      }
    });
    ro.observe(heroRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="px-[18px] pt-3">
      <div className="relative" ref={heroRef}>
        {/* Small logo + text as one scaled unit, desktop only */}
        <motion.div
          className="hidden md:flex items-start gap-[8px] absolute top-0 left-0 z-10 origin-top-left"
          initial={{ opacity: 0, x: -20, scale: smallLogoScale }}
          animate={{ opacity: 1, x: 0, scale: smallLogoScale }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ARKLogoScaled width={80} />
          <div className={`${FONT} text-[#141414] pt-[2px]`}>
            <p className="font-thin leading-tight" style={{ fontSize: "16px" }}>A.RK</p>
            <p className="font-thin leading-tight whitespace-nowrap" style={{ fontSize: "12px" }}>
              Virtual · Art · Live
            </p>
          </div>
        </motion.div>
        <div className="relative w-full" style={{ aspectRatio: "1413 / 341" }}>
          {/* Media block - reveal from right */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 bg-[#476e8a] overflow-hidden"
            style={{ width: "61.3%" }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Logo - fade in with slight scale */}
          <motion.div
            className="absolute top-0 left-0 bottom-0"
            style={{ width: "52.6%" }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ResponsiveLogo className="w-full h-full" />
          </motion.div>
        </div>
      </div>
      {/* Spacing between hero and black bar */}
      <div className="h-[12px] md:h-[14px]" />
      <motion.div
        className="bg-[#141414] w-full h-[6px] md:h-[8px]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

function TitleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div className="px-[18px]" id="index" ref={ref}>
      <div className="flex border-b border-[#141414]">
        <div className="hidden md:block md:w-[33%] border-r border-[#141414]" />
        <div className="py-4 md:py-6 md:pl-5 flex-1 overflow-hidden">
          <motion.p
            className={`${FONT} text-[#141414] font-black leading-tight`}
            style={{ fontSize: "clamp(36px, 5vw, 70px)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A.RK
          </motion.p>
          <motion.p
            className={`${FONT} text-[#141414] font-bold leading-tight`}
            style={{ fontSize: "clamp(28px, 4.6vw, 66px)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Art · Research · Knowledge
          </motion.p>
        </div>
      </div>
      <motion.div
        className="flex justify-between items-center py-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <p className={`${FONT} text-[#141414] text-[13px] md:text-[15px]`}>
          Just some text here
        </p>
        <div className="flex items-center gap-1">
          <p className={`${FONT} text-[#141414] text-[13px] md:text-[15px]`}>
            Scroll to Explore
          </p>
          <motion.svg
            width="15" height="18" viewBox="0 0 15 18" fill="none"
            style={{ transform: "rotate(90deg)" }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={svgPaths.p16ebcf00} fill="#141414" />
          </motion.svg>
        </div>
      </motion.div>
    </div>
  );
}

function MediaSection() {
  return (
    <FadeIn className="px-[18px]" direction="up" delay={0.1}>
      <div id="gallery">
        <motion.div
          className="bg-[#141414] w-full flex flex-col justify-between p-6 md:p-10 overflow-hidden"
          style={{ aspectRatio: "1413 / 585", minHeight: "280px" }}
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.4 }}
        >
          <div />
          <p className={`${FONT} text-white text-center font-thin`} style={{ fontSize: "clamp(28px, 4.6vw, 66px)" }}>
            媒体层占位符
          </p>
          <p className={`${FONT} text-white font-bold`} style={{ fontSize: "clamp(22px, 4.6vw, 66px)" }}>
            Redefine your virtual experience
          </p>
        </motion.div>
      </div>
    </FadeIn>
  );
}

function FooterInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div className="px-[18px]" style={{ marginTop: "clamp(40px, 6vw, 90px)" }} id="about" ref={ref}>
      <motion.div
        className="flex justify-between items-center py-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className={`${FONT} text-[#141414] text-[11px] sm:text-[13px] md:text-[15px]`}>
          Vliver, researcher, bassist, or perhaps just an internet dweller.
        </p>
        <p className={`${FONT} text-[#141414] text-[11px] sm:text-[13px] md:text-[15px] shrink-0`}>
          夏可Ark©2026
        </p>
      </motion.div>
      <motion.div
        className="bg-[#141414] w-full relative z-10"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ height: "clamp(24px, 3.2vw, 46px)", transformOrigin: "left" }}
      />
    </div>
  );
}

function BottomSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="px-[18px] pb-6 md:pb-0" id="memo" ref={ref}>
      {/* Mobile: stacked */}
      <div className="flex flex-col md:hidden gap-6">
        <FadeIn direction="up" delay={0}>
          <ResponsiveLogo className="w-full" />
        </FadeIn>
        <FadeIn direction="up" delay={0.15}>
          <p className={`${FONT} text-[#141414] font-light mb-2`} style={{ fontSize: "clamp(20px, 2.8vw, 40px)" }}>
            Want to know more ?
          </p>
          <nav className="flex flex-col">
            {["Gallery", "Memo", "About"].map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${FONT} text-[#141414] font-black leading-[0.9] block hover:opacity-60 transition-opacity ${i === 1 ? "pl-[25%]" : ""}`}
                style={{ fontSize: "clamp(48px, 12vw, 112px)" }}
              >
                {item}
              </a>
            ))}
          </nav>
        </FadeIn>
      </div>
      {/* Desktop: logo and nav side by side, matching Figma positions */}
      <div className="hidden md:block relative" style={{ aspectRatio: "1413 / 356" }}>
        {/* Logo at left */}
        <motion.div
          className="absolute left-0 overflow-hidden"
          style={{ width: "52.6%", top: 0, height: "95%" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <ResponsiveLogo className="w-full h-full" />
        </motion.div>
        {/* Right-side text group */}
        <div className="absolute z-10" style={{ left: "53.9%", top: 0, right: 0, bottom: 0 }}>
          <motion.p
            className={`${FONT} text-[#141414] font-light`}
            style={{ fontSize: "clamp(16px, 2.8vw, 40px)", lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Want to know more ?
          </motion.p>
          <div style={{ marginTop: "clamp(-4px, -0.5vw, 0px)" }}>
            {["Gallery", "Memo", "About"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${FONT} text-[#141414] font-black block leading-[0.9] hover:opacity-60 transition-opacity`}
                style={{
                  fontSize: "clamp(48px, 7.8vw, 112px)",
                  ...(item === "Memo" ? { paddingLeft: "14.3%" } : {}),
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                whileHover={{ x: 8 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#e7e4df] min-h-screen w-full pb-[18px]">
      <HeroSection />
      <NavBar sticky />
      <TitleSection />
      <MediaSection />
      <FooterInfo />
      <BottomSection />
    </div>
  );
}