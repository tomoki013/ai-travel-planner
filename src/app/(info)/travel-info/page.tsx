import { Metadata } from "next";
import TravelInfoClient from "./TravelInfoClient";

export const metadata: Metadata = {
  title: "渡航情報・安全ガイド",
  description: "世界各国のビザ、電源、チップ、治安情報を一括チェック。",
};

export default function TravelInfoPage() {
  return <TravelInfoClient />;
}
