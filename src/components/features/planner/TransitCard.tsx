"use client";

import { TransitInfo, TransitType } from "@/types";
import { FaPlane, FaTrain, FaBus, FaShip, FaCar, FaQuestion } from "react-icons/fa";

interface TransitCardProps {
  transit: TransitInfo;
  className?: string;
}

const ICONS: Record<TransitType, any> = {
  flight: FaPlane,
  train: FaTrain,
  bus: FaBus,
  ship: FaShip,
  car: FaCar,
  other: FaQuestion,
};

export default function TransitCard({ transit, className = "" }: TransitCardProps) {
  const Icon = ICONS[transit.type] || FaQuestion;

  return (
    <div className={`relative w-full max-w-2xl mx-auto my-6 drop-shadow-md ${className}`}>
      {/* Main Ticket Container */}
      <div className="bg-white rounded-xl overflow-hidden flex relative">

        {/* Left Section (Main Info) */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between relative z-10">
          {/* Header: Type and Date/Memo */}
          <div className="flex items-center gap-3 mb-4 border-b border-stone-100 pb-3 border-dashed">
            <div className="flex items-center gap-2 bg-stone-800 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Icon />
              <span>{transit.type}</span>
            </div>
            {transit.memo && (
              <span className="text-stone-400 text-xs font-mono truncate max-w-[150px]">
                {transit.memo}
              </span>
            )}
          </div>

          {/* Route Info */}
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Departure */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">From</div>
              <div className="text-xl sm:text-2xl font-bold text-stone-800 font-serif leading-none truncate" title={transit.departure.place}>
                {transit.departure.place}
              </div>
              <div className="text-sm font-mono text-stone-500 mt-1">
                {transit.departure.time || "--:--"}
              </div>
            </div>

            {/* Direction Icon */}
            <div className="flex flex-col items-center justify-center text-stone-300">
               <Icon className="text-xl mb-1 rotate-0 sm:rotate-45" />
               <div className="w-12 h-px bg-stone-300 border-t border-dashed"></div>
               {transit.duration && (
                   <span className="text-[10px] mt-1 font-mono">{transit.duration}</span>
               )}
            </div>

            {/* Arrival */}
            <div className="flex-1 min-w-0 text-right">
              <div className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">To</div>
              <div className="text-xl sm:text-2xl font-bold text-stone-800 font-serif leading-none truncate" title={transit.arrival.place}>
                {transit.arrival.place}
              </div>
              <div className="text-sm font-mono text-stone-500 mt-1">
                {transit.arrival.time || "--:--"}
              </div>
            </div>
          </div>
        </div>

        {/* Divider with perforations */}
        <div className="relative w-0 border-l-2 border-dashed border-stone-200 my-3">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#fcfbf9] rounded-full shadow-inner"></div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#fcfbf9] rounded-full shadow-inner"></div>
        </div>

        {/* Right Section (Stub / Barcode) - Hidden on very small screens? No, let's keep it minimal */}
        <div className="w-16 sm:w-24 bg-stone-50 flex flex-col items-center justify-center p-2 border-l border-dashed border-stone-200 relative">
             {/* Fake Barcode */}
             <div className="h-full w-full flex flex-col justify-between py-2 opacity-50">
                 <div className="w-full h-full" style={{
                     background: `repeating-linear-gradient(
                         0deg,
                         #000,
                         #000 2px,
                         transparent 2px,
                         transparent 4px,
                         #000 4px,
                         #000 5px,
                         transparent 5px,
                         transparent 8px
                     )`
                 }}></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                 <span className="rotate-90 text-[10px] text-stone-400 font-mono tracking-[0.2em] whitespace-nowrap">
                    BOARDING PASS
                 </span>
             </div>
        </div>
      </div>
    </div>
  );
}
