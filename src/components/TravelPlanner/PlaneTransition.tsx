"use client";

import { FaPlane } from "react-icons/fa";

export default function PlaneTransition() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Optional: Add a subtle overlay or just the plane */}
      {/* We use a container to apply the animation */}
      <div
        className="text-primary absolute"
        style={{
          animation: "fly-across 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards",
          // Initial position is handled by keyframes, but good to set a base
          left: 0,
          bottom: 0,
        }}
      >
        <FaPlane size={80} />
      </div>
    </div>
  );
}
