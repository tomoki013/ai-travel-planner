"use client";

import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function FAQCard({ question, answer, isOpen, onClick }: FAQCardProps) {
  return (
    <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <button
        onClick={onClick}
        className="w-full flex items-start md:items-center justify-between p-5 md:p-6 text-left hover:bg-[#fffdfa] transition-colors gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 flex-1">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e67e22]/10 text-[#e67e22] flex items-center justify-center font-serif font-bold text-sm mt-0.5 md:mt-0">
            Q
          </span>
          <span className="font-bold text-lg text-[#2c2c2c] group-hover:text-[#e67e22] transition-colors leading-snug">
            {question}
          </span>
        </div>
        <span className="flex-shrink-0 mt-1 md:mt-0">
          {isOpen ? (
            <FaChevronUp className="text-[#e67e22]" />
          ) : (
            <FaChevronDown className="text-stone-400 group-hover:text-[#e67e22] transition-colors" />
          )}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 pl-[4.5rem] md:pl-20 pr-6 text-stone-600 leading-relaxed border-t border-dashed border-stone-100 bg-[#fffdfa]">
          <div className="flex gap-4">
            <span className="flex-shrink-0 font-serif font-bold text-[#27ae60] mt-1">A.</span>
            <span className="whitespace-pre-wrap">{answer}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
