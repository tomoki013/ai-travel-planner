"use client";

import { motion } from "framer-motion";

export default function SamplePlanSkeleton() {
  return (
    <div className="h-full bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="relative p-5 pb-3 border-b border-stone-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-stone-100" />
        <div className="h-6 w-3/4 bg-stone-100 rounded-md animate-pulse mb-1" />
        <div className="h-6 w-1/2 bg-stone-100 rounded-md animate-pulse" />
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-stone-100 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-stone-100 rounded-md animate-pulse" />
          <div className="h-4 w-2/3 bg-stone-100 rounded-md animate-pulse" />
        </div>

        {/* Plan Info */}
        <div className="flex flex-wrap gap-3">
          <div className="h-4 w-20 bg-stone-100 rounded-md animate-pulse" />
          <div className="h-4 w-24 bg-stone-100 rounded-md animate-pulse" />
          <div className="h-4 w-16 bg-stone-100 rounded-md animate-pulse" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <div className="h-6 w-16 bg-stone-100 rounded-lg animate-pulse" />
          <div className="h-6 w-20 bg-stone-100 rounded-lg animate-pulse" />
          <div className="h-6 w-14 bg-stone-100 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 bg-stone-50 border-t border-stone-100">
        <div className="h-4 w-20 bg-stone-200 rounded-md animate-pulse" />
      </div>
    </div>
  );
}
