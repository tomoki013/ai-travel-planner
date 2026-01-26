'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaHome,
  FaMap,
  FaQuestionCircle,
  FaPen,
  FaMapMarkerAlt,
  FaSuitcase,
  FaPlane,
} from 'react-icons/fa';

import { useAuth } from '@/context/AuthContext';
import { usePlanModal } from '@/context/PlanModalContext';
import { useLocalPlans } from '@/lib/local-storage/plans';
import type { PlanListItem } from '@/types';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  serverPlans?: PlanListItem[];
  isLoadingPlans?: boolean;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  serverPlans = [],
  isLoadingPlans = false,
}: MobileSidebarProps) {
  const { isAuthenticated } = useAuth();
  const { openModal } = usePlanModal();
  const { plans: localPlans } = useLocalPlans();

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCreatePlan = () => {
    onClose();
    openModal();
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'short',
      day: 'numeric',
    }).format(d);
  };

  // Decide which plans to show
  const displayPlans = isAuthenticated ? serverPlans : localPlans;
  const hasPlans = displayPlans.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#fcfbf9] shadow-2xl z-[80] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dashed border-stone-200">
              <Link href="/" onClick={onClose} className="group flex items-center gap-1">
                <span className="font-serif text-xl font-bold text-[#e67e22] tracking-tight group-hover:opacity-80 transition-opacity flex items-center">
                  <span>Tabide</span>
                  <span className="text-[#27ae60] font-extrabold flex items-center ml-px">
                    .a
                    <FaMapMarkerAlt className="text-[0.85em] mt-0.5" />
                  </span>
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
                aria-label="メニューを閉じる"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-2">
              <SidebarLink href="/" icon={<FaHome />} label="ホーム" onClick={onClose} />
              <SidebarLink href="/usage" icon={<FaMap />} label="使い方" onClick={onClose} />
              <SidebarLink href="/faq" icon={<FaQuestionCircle />} label="よくある質問" onClick={onClose} />
            </nav>

            {/* Divider */}
            <div className="mx-4 border-t border-dashed border-stone-200" />

            {/* Plans Section */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <FaSuitcase className="text-[#e67e22]/70" />
                  <span className="font-medium text-stone-700 text-sm">
                    {isAuthenticated ? '保存したプラン' : 'ローカルプラン'}
                  </span>
                </div>
                {isAuthenticated && (
                  <Link
                    href="/my-plans"
                    onClick={onClose}
                    className="text-xs text-[#e67e22] hover:text-[#d35400] transition-colors"
                  >
                    すべて見る
                  </Link>
                )}
              </div>

              {/* Plans List */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {isLoadingPlans ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-stone-100 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                ) : hasPlans ? (
                  <div className="space-y-2">
                    {displayPlans.slice(0, 5).map((plan) => {
                      // Determine link and plan info based on type
                      const isLocalPlan = 'itinerary' in plan;
                      const href = isLocalPlan
                        ? `/plan/local/${plan.id}`
                        : `/plan/id/${plan.id}`;
                      const destination = isLocalPlan
                        ? (plan as { itinerary: { destination?: string } }).itinerary?.destination
                        : (plan as PlanListItem).destination;
                      const thumbnailUrl = isLocalPlan
                        ? (plan as { itinerary: { heroImage?: string } }).itinerary?.heroImage
                        : (plan as PlanListItem).thumbnailUrl;
                      const createdAt = plan.createdAt;

                      return (
                        <Link
                          key={plan.id}
                          href={href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#e67e22]/5 transition-colors group"
                        >
                          {/* Thumbnail */}
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                            {thumbnailUrl ? (
                              <Image
                                src={thumbnailUrl}
                                alt={destination || '旅行プラン'}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e67e22]/10 to-[#27ae60]/10">
                                <FaMapMarkerAlt className="text-[#e67e22]/40" />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-stone-800 truncate group-hover:text-[#e67e22] transition-colors">
                              {destination || '目的地未設定'}
                            </p>
                            <p className="text-xs text-stone-400">
                              {formatDate(createdAt)}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    {displayPlans.length > 5 && (
                      <Link
                        href={isAuthenticated ? '/my-plans' : '#'}
                        onClick={onClose}
                        className="block text-center text-xs text-stone-500 hover:text-[#e67e22] py-2 transition-colors"
                      >
                        他 {displayPlans.length - 5} 件のプラン
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#e67e22]/5 flex items-center justify-center">
                      <FaPlane className="text-[#e67e22]/30 text-xl" />
                    </div>
                    <p className="text-sm text-stone-500 mb-1">
                      プランがありません
                    </p>
                    <p className="text-xs text-stone-400">
                      新しい旅を計画しましょう
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Create Plan Button */}
            <div className="p-4 border-t border-dashed border-stone-200">
              <button
                onClick={handleCreatePlan}
                className="w-full flex items-center justify-center gap-2 bg-[#e67e22] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#d35400] transition-all"
              >
                <FaPen className="text-sm" />
                <span>プランを作成する</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-stone-700 hover:bg-[#e67e22]/5 hover:text-[#e67e22] transition-colors"
    >
      <span className="text-[#e67e22]/60">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
