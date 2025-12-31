"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    q: "料金はかかりますか？",
    a: "いいえ、現在のベータ版はすべての機能を無料でご利用いただけます。",
  },
  {
    q: "提案されたプランは保存できますか？",
    a: "URLをコピーすることで、いつでもプランにアクセスし、友人と共有することができます。",
  },
  {
    q: "海外の旅行プランも作れますか？",
    a: "はい、世界中の主要な観光地に対応しています。Google Mapsの情報に基づきプランを作成します。",
  },
  {
    q: "AIの回答は正確ですか？",
    a: "AIは最新の情報に基づいて提案しますが、営業時間や料金などは変更されている可能性があります。必ず公式サイトで最新情報をご確認ください。",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 px-4 bg-[#fcfbf9]">
      <div className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-foreground">
          よくある質問
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-gray-800">{faq.q}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-400" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-dashed border-gray-100">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
