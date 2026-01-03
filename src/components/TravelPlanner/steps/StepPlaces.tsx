"use client";

import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface StepPlacesProps {
  mustVisitPlaces: string[];
  onChange: (places: string[]) => void;
  onNext: () => void;
}

export default function StepPlaces({
  mustVisitPlaces,
  onChange,
  onNext,
}: StepPlacesProps) {
  const [hasPlaces, setHasPlaces] = useState<boolean | null>(
    mustVisitPlaces.length > 0 ? true : null
  );
  const [currentInput, setCurrentInput] = useState("");

  const handleAddPlace = () => {
    if (currentInput.trim()) {
      onChange([...mustVisitPlaces, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleRemovePlace = (index: number) => {
    const newPlaces = [...mustVisitPlaces];
    newPlaces.splice(index, 1);
    onChange(newPlaces);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddPlace();
    }
  };

  const handleNoPlaces = () => {
    setHasPlaces(false);
    onChange([]);
  };

  return (
    <div className="flex flex-col h-full w-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="space-y-4 text-center mb-6 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight">
          絶対に行きたい
          <br />
          観光地はありますか？
        </h2>
        <p className="font-hand text-muted-foreground text-sm sm:text-base">
          もしあれば、優先的にプランに組み込みます
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full px-4 overflow-y-auto min-h-0">
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setHasPlaces(true)}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              hasPlaces === true
                ? "bg-primary text-white shadow-md scale-105"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            ある
          </button>
          <button
            onClick={handleNoPlaces}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              hasPlaces === false
                ? "bg-secondary text-white shadow-md scale-105"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            ない
          </button>
        </div>

        {/* Input Area (Only if "Yes" is selected) */}
        {hasPlaces && (
          <div className="w-full space-y-6 animate-in zoom-in-95 duration-300">
            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="場所名を入力 (例: 清水寺)"
                className="flex-1 px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                autoFocus
              />
              <button
                onClick={handleAddPlace}
                disabled={!currentInput.trim()}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaPlus />
              </button>
            </div>

            {/* List of Added Places */}
            {mustVisitPlaces.length > 0 && (
              <div className="bg-white/50 rounded-2xl p-4 space-y-2 border border-stone-100">
                {mustVisitPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-xl border border-stone-200 shadow-sm animate-in slide-in-from-bottom-2 duration-300"
                  >
                    <span className="font-medium text-stone-700">{place}</span>
                    <button
                      onClick={() => handleRemovePlace(index)}
                      className="text-stone-400 hover:text-destructive p-2 transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation - only show Next if selection is made */}
      {hasPlaces !== null && (
         <div className="mt-4 flex justify-center shrink-0 pb-2">
            {/* The main container handles the actual next button via onNext prop usually,
                but StepContainer handles the bottom bar.
                Here we rely on the main container's Next button,
                but we need to make sure the user can click it.
                Actually, the StepContainer renders the Next button.
                We just need to make sure the state is valid.
                Wait, for "No", I called onNext directly in the handler, but for "Yes", the user adds items and then manually clicks Next on the parent container.
                Wait, StepContainer renders "Back" and "Next".
                If I call `onNext()` here, it might duplicate logic or auto-advance.
                Let's stick to the pattern: update state, and let user click Next in StepContainer.
            */}
         </div>
      )}
    </div>
  );
}
