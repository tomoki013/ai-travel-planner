"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBookOpen, FaMapMarkedAlt } from "react-icons/fa";

interface HeroSectionProps {
  children: ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center pt-32 sm:pt-40 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#fcfbf9] -z-20" />
      <div className="absolute inset-0 bg-[url('/images/cream-paper.png')] opacity-40 mix-blend-multiply -z-10" />

      {/* Subtle Gradient Spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] -z-10" />

      {/* Decorative Floating Elements (Stamps/Icons) */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.1, rotate: -10 }}
        transition={{ duration: 1.5 }}
        className="absolute top-32 left-10 md:left-20 text-8xl text-stone-900 pointer-events-none select-none hidden lg:block font-serif"
      >
        Travel
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 0.1, rotate: 10 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-40 right-10 md:right-20 text-8xl text-[#e67e22] pointer-events-none select-none hidden lg:block font-hand"
      >
        Memories
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col gap-12 items-center text-center relative z-10">
        <div className="space-y-8 max-w-3xl">
          {/* Badge */}
          <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="inline-flex items-center gap-2 text-[#e67e22] font-serif font-bold tracking-wider text-sm sm:text-base bg-white/90 px-5 py-2 rounded-full border border-orange-200 shadow-sm rotate-1"
          >
             <FaBookOpen className="text-sm" />
             <span>Story of your journey starts here</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#2c2c2c] leading-tight tracking-tight drop-shadow-sm"
          >
            心の奥にある
            <span className="relative inline-block mx-2">
              <span className="relative z-10">『行きたい』</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-200/50 -z-0 rotate-1 rounded-sm"></span>
            </span>
            を、
            <br className="sm:hidden" />
            かたちに。
          </motion.h1>

          {/* Subtext with handwritten feel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative inline-block"
          >
             <p className="text-lg sm:text-2xl text-stone-600 font-hand leading-relaxed max-w-2xl mx-auto">
              まだ言葉にならない旅の種を、
              <br className="sm:hidden" />
              AIと一緒に育ててみませんか？
            </p>

            {/* Hand-drawn arrow decoration */}
            <svg className="absolute -right-8 -bottom-8 w-16 h-16 text-stone-300 hidden sm:block rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 20 Q 60 40 40 80 M 30 70 L 40 80 L 55 70" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Planner Container - Notebook/Journal Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full relative z-10 mt-4"
        >
          {/* Notebook binding effect (visual) */}
          <div className="absolute -left-3 top-10 bottom-10 w-8 bg-stone-800 rounded-l-md hidden xl:block shadow-2xl z-0" />

          <div className="relative bg-white/40 backdrop-blur-sm p-4 sm:p-8 rounded-[2rem] border-2 border-white/50 shadow-xl">
             {/* "Paper" Container */}
             <div className="bg-[#fdfdfd] rounded-3xl border border-stone-200 shadow-sm overflow-hidden relative">
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[url('/images/cream-paper.png')] opacity-10 mix-blend-multiply pointer-events-none" />

                {/* Top decorative strip */}
                <div className="h-2 w-full bg-gradient-to-r from-orange-200 via-red-200 to-blue-200 opacity-50" />

                <div className="p-2 sm:p-4">
                  {children}
                </div>
             </div>

             {/* Decorative Tape */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-orange-100/80 rotate-1 backdrop-blur-sm shadow-sm border border-white/50 transform skew-x-12" />
          </div>

          <div className="mt-10 text-center">
             <Link
              href="/usage"
              className="group inline-flex items-center gap-2 text-stone-500 hover:text-[#e67e22] transition-colors font-hand text-lg"
            >
              <FaMapMarkedAlt className="group-hover:rotate-12 transition-transform" />
              <span className="border-b border-dashed border-stone-400 group-hover:border-[#e67e22] pb-0.5">初めての方はこちら（使い方）</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
