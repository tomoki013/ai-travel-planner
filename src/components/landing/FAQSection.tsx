"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    q: "誰が運営していますか？",
    a: "個人開発者（tomoki013）のポートフォリオ作品として公開しています。商用サービスではありません。開発の経緯や詳細はGitHubをご覧ください。",
  },
  {
    q: "入力した情報はAIの学習に使われますか？",
    a: "いいえ、Google Gemini APIの規約に基づき、入力されたデータがモデルの学習に使用されることはありません。安心してご利用ください。",
  },
  {
    q: "生成されたプランの正確性は保証されますか？",
    a: "AIはもっともらしい情報を生成しますが、ハルシネーション（嘘の情報）が含まれる可能性があります。営業時間や料金などは、必ず公式サイト等で最新情報をご確認ください。",
  },
  {
    q: "ソースコードは公開されていますか？",
    a: "はい、本プロジェクトのソースコードはGitHubで公開しています。フッターのアイコンからリポジトリにアクセスできます。",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 px-4 bg-[#fcfbf9]">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2c2c2c]">
            このプロジェクトについて
          </h2>
          <p className="text-stone-600 leading-relaxed font-hand text-lg max-w-2xl mx-auto">
            AI Travel Plannerは、Google Geminiを活用して、あなたの理想の旅行プランを提案する実験的なアプリケーションです。<br />
            旅のワクワク感を大切にし、手書きの旅行日記のような温かみのあるデザインを目指しました。
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fcfbf9] transition-colors"
              >
                <span className="font-bold text-lg text-[#2c2c2c]">{faq.q}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-[#e67e22]" />
                ) : (
                  <FaChevronDown className="text-stone-400" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-stone-600 leading-relaxed border-t border-dashed border-stone-200">
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
