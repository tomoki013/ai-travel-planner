import Link from "next/link";
import { ReactNode } from "react";

export interface PolicyLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * ポリシーリンクコンポーネント
 * @param props.href - リンク先URL
 * @param props.children - リンクテキスト
 * @param props.className - 追加のCSSクラス
 * @param props.target - リンクターゲット
 * @param props.rel - rel属性
 */
export default function PolicyLink({ href, children, className = "", target, rel }: PolicyLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`text-[#e67e22] hover:text-[#d35400] hover:underline decoration-dashed decoration-1 underline-offset-4 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
