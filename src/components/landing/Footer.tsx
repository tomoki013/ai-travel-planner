import Link from "next/link";
import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2c2c2c] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-2xl font-serif font-bold">AI Travel Planner</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            あなたの旅の物語を、AIと一緒に紡ぎ出す。<br />
            Powered by ともきちの旅行日記
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-200">Menu</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">ホーム</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">使い方</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">よくある質問</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-200">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-xs text-gray-500">
        <p>© 2025 AI Travel Planner. All rights reserved.</p>
        <p className="mt-2 opacity-50">
          ※本サイトはデモ目的で作成されています。実際の旅行の際は各自治体や施設の最新情報をご確認ください。
        </p>
      </div>
    </footer>
  );
}
