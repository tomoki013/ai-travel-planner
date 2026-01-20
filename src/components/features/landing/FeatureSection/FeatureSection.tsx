"use client";

import { motion } from "framer-motion";
import { FaCompass, FaMapMarkedAlt, FaPencilAlt } from "react-icons/fa";

const features = [
  {
    icon: FaCompass,
    title: "あなただけのガイド",
    description: "AIがあなたの好みを理解し、世界に一つだけのプランを提案します。",
    delay: 0.1,
  },
  {
    icon: FaMapMarkedAlt,
    title: "未知の場所へ",
    description: "ガイドブックには載っていない、隠れた名所を見つけましょう。",
    delay: 0.2,
  },
  {
    icon: FaPencilAlt,
    title: "物語を編集する",
    description: "提案されたプランは自由自在。あなたの旅の物語を完成させてください。",
    delay: 0.3,
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full py-20 px-4 bg-white/50 border-t border-b border-dashed border-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
