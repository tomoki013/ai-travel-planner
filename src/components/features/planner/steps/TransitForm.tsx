"use client";

import { useState } from "react";
import { TransitInfo, TransitType } from "@/types";
import { FaPlane, FaTrain, FaBus, FaShip, FaCar, FaQuestion, FaTimes, FaCheck } from "react-icons/fa";

interface TransitFormProps {
  dayIndex: number;
  totalDays: number;
  startDate?: string;
  initialData?: TransitInfo;
  onSave: (data: TransitInfo) => void;
  onCancel: () => void;
}

const TRANSIT_TYPES: { id: TransitType; label: string; icon: any }[] = [
  { id: "flight", label: "飛行機", icon: FaPlane },
  { id: "train", label: "新幹線・電車", icon: FaTrain },
  { id: "bus", label: "バス", icon: FaBus },
  { id: "ship", label: "船", icon: FaShip },
  { id: "car", label: "車", icon: FaCar },
  { id: "other", label: "その他", icon: FaQuestion },
];

export default function TransitForm({
  dayIndex,
  totalDays,
  startDate,
  initialData,
  onSave,
  onCancel,
}: TransitFormProps) {
  const [type, setType] = useState<TransitType>(initialData?.type || "flight");
  const [depPlace, setDepPlace] = useState(initialData?.departure.place || "");
  const [depTime, setDepTime] = useState(initialData?.departure.time || "");
  const [arrPlace, setArrPlace] = useState(initialData?.arrival.place || "");
  const [arrTime, setArrTime] = useState(initialData?.arrival.time || "");
  const [memo, setMemo] = useState(initialData?.memo || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type,
      departure: { place: depPlace, time: depTime },
      arrival: { place: arrPlace, time: arrTime },
      memo,
    });
  };

  return (
    <div className="bg-stone-50 rounded-lg p-4 border-2 border-dashed border-stone-200 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-stone-700 flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1 rounded-md text-xs">Day {dayIndex}</span>
          移動詳細
        </h4>
        <button onClick={onCancel} className="text-stone-400 hover:text-stone-600">
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Selection */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {TRANSIT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border min-w-[60px] transition-all ${
                type === t.id
                  ? "bg-white border-primary text-primary shadow-sm"
                  : "bg-transparent border-transparent text-stone-400 hover:bg-stone-100"
              }`}
            >
              <t.icon className="text-xl mb-1" />
              <span className="text-[10px] font-bold whitespace-nowrap">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Route */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 block">出発 (From)</label>
            <input
              required
              value={depPlace}
              onChange={(e) => setDepPlace(e.target.value)}
              placeholder="大阪(KIX)"
              className="w-full text-sm bg-white border border-stone-200 rounded p-2 focus:border-primary focus:outline-hidden"
            />
            <input
              type="time"
              value={depTime}
              onChange={(e) => setDepTime(e.target.value)}
              className="w-full text-xs text-stone-500 bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
          <div className="text-stone-300">✈︎</div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 block">到着 (To)</label>
            <input
              required
              value={arrPlace}
              onChange={(e) => setArrPlace(e.target.value)}
              placeholder="KL"
              className="w-full text-sm bg-white border border-stone-200 rounded p-2 focus:border-primary focus:outline-hidden"
            />
            <input
              type="time"
              value={arrTime}
              onChange={(e) => setArrTime(e.target.value)}
              className="w-full text-xs text-stone-500 bg-transparent border-none p-0 focus:ring-0 text-right"
            />
          </div>
        </div>

        {/* Memo */}
        <div>
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="便名・メモ (例: JL123)"
            className="w-full text-sm bg-stone-100 border-none rounded p-2 placeholder:text-stone-400 focus:bg-white focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-stone-800 text-white font-bold py-2 rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
        >
          <FaCheck /> 保存
        </button>
      </form>
    </div>
  );
}
