"use client";

import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { motion } from "framer-motion";

interface StepPlacesProps {
  mustVisitPlaces?: string[];
  onChange: (places: string[]) => void;
  // onNext is handled by StepContainer via parent
}

export default function StepPlaces({
  mustVisitPlaces = [],
  onChange,
}: StepPlacesProps) {
  const [inputText, setInputText] = useState("");
  // Determine initial state: if list has items, "Yes" is selected. If empty, null (undecided) or false?
  // Let's use null for undecided, so we can show the choice UI.
  // If list is empty but user already interacted (maybe they cleared list), we might want to stay in "Yes".
  // But strictly, if they navigate back, if list is empty, maybe show choice again?
  // Let's assume: length > 0 => true. length === 0 => null.
  const [hasPlaces, setHasPlaces] = useState<boolean | null>(
    mustVisitPlaces.length > 0 ? true : null
  );

  const handleAdd = () => {
    if (inputText.trim()) {
      onChange([...mustVisitPlaces, inputText.trim()]);
      setInputText("");
    }
  };

  const handleDelete = (index: number) => {
    const newPlaces = [...mustVisitPlaces];
    newPlaces.splice(index, 1);
    onChange(newPlaces);
    // If list becomes empty, do we switch back to null? No, keep the input visible.
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleNoPlaces = () => {
    setHasPlaces(false);
    onChange([]);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif text-primary">
          行きたい観光地はありますか？
        </h2>
        <p className="text-muted-foreground text-sm">
          もし決まっている場所があれば教えてください。
          <br />
          （例：東京タワー、清水寺、USJなど）
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start mt-8">
        {hasPlaces === null ? (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full my-auto">
            <button
              onClick={() => setHasPlaces(true)}
              className="p-6 border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-center group bg-white shadow-sm"
            >
              <span className="block text-4xl mb-3 group-hover:scale-110 transition-transform">
                ✨
              </span>
              <span className="font-bold text-foreground block">ある</span>
            </button>
            <button
              onClick={handleNoPlaces}
              className="p-6 border-2 border-border rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all text-center group bg-white shadow-sm"
            >
              <span className="block text-4xl mb-3 group-hover:scale-110 transition-transform">
                🤔
              </span>
              <span className="font-bold text-foreground block">特にない</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-md mx-auto w-full"
          >
            {hasPlaces ? (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="観光地名を入力..."
                    className="flex-1 px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white/80 backdrop-blur-sm shadow-sm"
                  />
                  <button
                    onClick={handleAdd}
                    disabled={!inputText.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="bg-white/40 p-4 rounded-lg border border-primary/10 min-h-[200px] overflow-y-auto max-h-[300px]">
                  {mustVisitPlaces.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">
                      ここに行きたい場所が追加されます
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {mustVisitPlaces.map((place, index) => (
                        <motion.li
                          key={`${index}-${place}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between bg-white px-3 py-2 rounded border border-border shadow-sm"
                        >
                          <span className="text-foreground">{place}</span>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <FaTrash size={14} />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setHasPlaces(false)}
                    className="text-sm text-muted-foreground hover:text-primary underline"
                  >
                    やっぱり特にない
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="text-5xl mb-4 opacity-50">🤖</div>
                <p className="text-muted-foreground mb-6 font-medium">
                  AIがあなたにぴったりの観光地をご提案します！
                </p>
                <button
                  onClick={() => setHasPlaces(true)}
                  className="text-sm text-muted-foreground hover:text-primary underline"
                >
                  やっぱり入力する
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
