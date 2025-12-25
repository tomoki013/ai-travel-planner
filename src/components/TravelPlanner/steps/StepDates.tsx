"use client";

import { UserInput } from "@/lib/types";
import { useState } from "react";

interface StepDatesProps {
  input: UserInput;
  onChange: (value: Partial<UserInput>) => void;
}

export default function StepDates({ input, onChange }: StepDatesProps) {
  // Parse existing date string or default
  // Format expectation: "YYYY-MM-DDからX日間" or just "X日間"
  const [startDate, setStartDate] = useState(() => {
    const match = input.dates.match(/(\d{4}-\d{2}-\d{2})から(\d+)日間/);
    return match ? match[1] : "";
  });

  const [duration, setDuration] = useState(() => {
    const match = input.dates.match(/(\d{4}-\d{2}-\d{2})から(\d+)日間/);
    if (match) return parseInt(match[2]);
    const durationMatch = input.dates.match(/(\d+)日間/);
    return durationMatch ? parseInt(durationMatch[1]) : 3; // Default 3 days
  });

  const updateParent = (d: string, dur: number) => {
    const datesStr = d ? `${d}から${dur}日間` : `${dur}日間`;
    onChange({ dates: datesStr });
  };

  const handleDateChange = (val: string) => {
    setStartDate(val);
    updateParent(val, duration);
  };

  const handleDurationChange = (val: number) => {
    // Limit between 1 and 30 days
    const newDur = Math.max(1, Math.min(30, val));
    setDuration(newDur);
    updateParent(startDate, newDur);
  };

  const clearDate = () => {
    setStartDate("");
    updateParent("", duration);
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">いつ、どれくらい？</h2>
      </div>

      <div className="space-y-8">
        {/* Date Input */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs text-white/50 uppercase tracking-widest">
              出発日 (任意)
            </label>
            {startDate && (
              <button
                onClick={clearDate}
                className="text-xs text-red-300 hover:text-red-200 underline"
              >
                クリア
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value)}
              style={{ colorScheme: "dark" }}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white text-xl focus:outline-hidden focus:border-white/50 transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Duration Input - Counter Style */}
        <div className="space-y-3">
          <label className="text-xs text-white/50 uppercase tracking-widest">
            旅行日数
          </label>
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
            <button
              onClick={() => handleDurationChange(duration - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all text-2xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={duration <= 1}
            >
              −
            </button>

            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-white block leading-none">
                {duration}
                <span className="text-sm font-normal text-white/60 ml-1">
                  日間
                </span>
              </span>
              <span className="text-[10px] text-white/40 block mt-1">
                {duration === 1 ? "日帰り" : `${duration - 1}泊${duration}日`}
              </span>
            </div>

            <button
              onClick={() => handleDurationChange(duration + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all text-2xl font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={duration >= 30}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
