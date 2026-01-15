"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaQuestionCircle, FaBookOpen } from "react-icons/fa";

interface HeaderProps {
  forceShow?: boolean;
  className?: string;
}

export default function Header({ forceShow = false, className = "" }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when path changes
  useEffect(() => {
    // Use setTimeout to avoid synchronous state update warning during render
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // If not forced to show, and on homepage, don't render (layout instance)
  if (!forceShow && pathname === "/") {
    return null;
  }

  // Base classes for the header
  const headerClasses = className
    ? className
    : "fixed top-0 left-0 right-0 z-50 border-b border-dashed border-stone-200/50";

  return (
    <>
      <header
        className={`${headerClasses} w-full bg-[#fcfbf9]/90 backdrop-blur-md transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-[#e67e22] group-hover:opacity-80 transition-opacity">
              Tabidea
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/usage"
              className="flex items-center gap-2 text-stone-600 hover:text-[#e67e22] transition-colors font-medium text-sm"
            >
              <FaBookOpen className="text-lg opacity-50" />
              <span>使い方</span>
            </Link>
            <Link
              href="/faq"
              className="flex items-center gap-2 text-stone-600 hover:text-[#e67e22] transition-colors font-medium text-sm"
            >
              <FaQuestionCircle className="text-lg opacity-50" />
              <span>FAQ</span>
            </Link>
            <Link
              href="/"
              className="bg-[#2c2c2c] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#4a4a4a] transition-all hover:scale-105 shadow-md flex items-center gap-2"
            >
              <span>プラン作成</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-stone-600 hover:text-[#e67e22] transition-colors"
            aria-label="Menu"
          >
            <FaBars size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#fcfbf9]/95 backdrop-blur-xl md:hidden flex flex-col"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between px-4 h-16 sm:h-20 border-b border-dashed border-stone-200">
              <span className="font-serif text-2xl font-bold text-[#e67e22]">
                Tabidea
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-600 hover:text-[#e67e22] transition-colors"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
              <Link
                href="/"
                className="text-2xl font-serif font-bold text-stone-800 hover:text-[#e67e22] transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/usage"
                className="text-2xl font-serif font-bold text-stone-800 hover:text-[#e67e22] transition-colors"
              >
                使い方
              </Link>
              <Link
                href="/faq"
                className="text-2xl font-serif font-bold text-stone-800 hover:text-[#e67e22] transition-colors"
              >
                よくある質問
              </Link>
              <div className="pt-8 w-full max-w-xs">
                <Link
                  href="/"
                  className="flex items-center justify-center w-full bg-[#2c2c2c] text-white py-4 rounded-full font-bold text-lg hover:bg-[#4a4a4a] transition-all shadow-lg"
                >
                  プランを作成する
                </Link>
              </div>
            </div>

            {/* Overlay Footer */}
            <div className="p-8 text-center text-xs text-stone-400 font-hand">
              Keep planning freely.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
