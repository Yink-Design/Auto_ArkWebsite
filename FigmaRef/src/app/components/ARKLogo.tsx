import React from "react";

// Original Figma logo shape, rendered at native 744x341 and scaled via CSS
function LogoInner() {
  return (
    <>
      {/* Center vertical bar */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: "241.01px", top: 0, width: "141.015px", height: "341px" }}
      >
        <div className="-rotate-90 flex-none">
          <div className="bg-[#141414]" style={{ height: "141.015px", width: "341px" }} />
        </div>
      </div>
      {/* Bottom-right diagonal */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: "402.53px", top: "99.05px", width: "340.836px", height: "340.836px" }}
      >
        <div className="-scale-y-100 flex-none rotate-45">
          <div className="bg-[#141414]" style={{ height: "141.015px", width: "341px" }} />
        </div>
      </div>
      {/* Top-right diagonal */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: "402.69px", top: "-241.01px", width: "340.836px", height: "340.836px" }}
      >
        <div className="-scale-y-100 flex-none" style={{ transform: "scaleY(-1) rotate(135deg)" }}>
          <div className="bg-[#141414]" style={{ height: "141.015px", width: "341px" }} />
        </div>
      </div>
      {/* Left triangle */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 0, top: 0, width: "340.836px", height: "340.836px" }}
      >
        <div className="-scale-y-100 flex-none" style={{ transform: "scaleY(-1) rotate(135deg)" }}>
          <div className="bg-[#141414]" style={{ height: "141.015px", width: "341px" }} />
        </div>
      </div>
    </>
  );
}

// Large logo - scales to fit parent width, maintains aspect ratio
export function ARKLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: "744 / 341" }}>
      <div className="absolute inset-0" style={{ width: "744px", height: "341px", transformOrigin: "top left" }}>
        <div className="relative w-full h-full" style={{ transform: "var(--logo-scale, scale(1))" }}>
          <LogoInner />
        </div>
      </div>
    </div>
  );
}

// Scalable logo wrapper - pass width and it scales proportionally
export function ARKLogoScaled({ width }: { width: number }) {
  const scale = width / 744;
  const height = 341 * scale;
  return (
    <div className="relative overflow-hidden" style={{ width: `${width}px`, height: `${height}px` }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: "744px", height: "341px", transform: `scale(${scale})` }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <LogoInner />
        </div>
      </div>
    </div>
  );
}

// Small logo for header
export function ARKLogoSmall() {
  return <ARKLogoScaled width={70} />;
}
