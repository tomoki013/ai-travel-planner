import { UserInput, Itinerary } from "./types";

export interface SamplePlan {
  id: string;
  title: string;
  description: string;
  input: UserInput;
  createdAt: string;
  tags: string[];
  /** 事前生成済みの旅程データ（オプション） */
  itinerary?: Itinerary;
}

/**
 * 日程から泊数を計算するヘルパー関数
 */
export function getNights(dates: string): number {
  const match = dates.match(/(\d+)泊(\d+)日/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 0;
}

/**
 * 日程から日数を計算するヘルパー関数
 */
export function getDays(dates: string): number {
  const match = dates.match(/(\d+)泊(\d+)日/);
  if (match) {
    return parseInt(match[2], 10);
  }
  return 1;
}

export const samplePlans: SamplePlan[] = [
  {
    id: "sapporo-otaru-family",
    title: "札幌・小樽 家族で楽しむ2泊3日",
    description:
      "北海道の王道ルート！札幌の時計台から小樽運河まで、子供も大人も楽しめるグルメと観光スポットを巡る旅。新鮮な海鮮丼やラーメン、スイーツも堪能できます。",
    input: {
      destination: "札幌・小樽",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "家族（子供あり）",
      theme: ["グルメ", "自然・絶景", "ショッピング"],
      budget: "中程度",
      pace: "ゆっくり",
      freeText:
        "子供が楽しめるスポットを中心に、北海道グルメも満喫したいです。移動は公共交通機関メインで。",
    },
    createdAt: "2025-06-15",
    tags: ["家族旅行", "2泊3日", "北海道", "夏", "グルメ"],
  },
  {
    id: "kyoto-nara-history",
    title: "京都・奈良 歴史巡り3泊4日",
    description:
      "世界遺産と古都の魅力を堪能する王道コース。金閣寺、清水寺、東大寺など定番スポットから、穴場の古寺まで。春の桜や秋の紅葉シーズンに特におすすめ。",
    input: {
      destination: "京都・奈良",
      isDestinationDecided: true,
      region: "domestic",
      dates: "3泊4日",
      companions: "友人",
      theme: ["文化・歴史", "寺社仏閣", "グルメ"],
      budget: "中程度",
      pace: "普通",
      freeText:
        "友人と京都・奈良を巡りたいです。有名な神社仏閣はもちろん、地元の人が行くようなお店も訪れたいです。",
    },
    createdAt: "2025-04-01",
    tags: ["友人旅行", "3泊4日", "京都", "奈良", "春", "文化体験"],
  },
  {
    id: "okinawa-islands-resort",
    title: "沖縄離島 リゾート満喫4泊5日",
    description:
      "石垣島と竹富島を巡るリゾートトリップ。エメラルドグリーンの海でシュノーケリング、赤瓦の街並み散策、満天の星空を楽しむ大人の癒し旅。",
    input: {
      destination: "石垣島・竹富島",
      isDestinationDecided: true,
      region: "domestic",
      dates: "4泊5日",
      companions: "カップル・夫婦",
      theme: ["ビーチ・海", "自然・絶景", "リラックス"],
      budget: "高め",
      pace: "ゆっくり",
      freeText:
        "カップルで南国リゾートを満喫したいです。マリンアクティビティと星空観察を楽しみたい。",
    },
    createdAt: "2025-07-20",
    tags: ["カップル", "4泊5日", "沖縄", "夏", "ビーチ", "リゾート"],
  },
  {
    id: "tokyo-weekend-solo",
    title: "東京近郊 週末リフレッシュ1泊2日",
    description:
      "一人でゆっくり過ごす東京アート旅。美術館巡りからおしゃれなカフェ、夜景スポットまで。週末だけで気軽にリフレッシュできるプラン。",
    input: {
      destination: "東京（六本木・渋谷・表参道）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "1泊2日",
      companions: "一人旅",
      theme: ["アート・美術館", "カフェ巡り", "ショッピング"],
      budget: "中程度",
      pace: "ゆっくり",
      freeText:
        "一人でアート鑑賞とカフェ巡りを楽しみたいです。人混みを避けて静かに過ごせる場所が好きです。",
    },
    createdAt: "2025-10-05",
    tags: ["一人旅", "1泊2日", "東京", "通年", "アート"],
  },
  {
    id: "kanazawa-gourmet",
    title: "金沢 美食と伝統工芸2泊3日",
    description:
      "北陸新幹線で行く金沢グルメ旅。近江町市場の海鮮、金沢おでん、加賀料理を堪能。兼六園、ひがし茶屋街、21世紀美術館も巡る充実の旅。",
    input: {
      destination: "金沢",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "カップル・夫婦",
      theme: ["グルメ", "文化・歴史", "アート・美術館"],
      budget: "中程度",
      pace: "普通",
      freeText:
        "金沢の美味しいものを食べ尽くしたいです。伝統工芸の体験もしてみたい。",
    },
    createdAt: "2025-11-10",
    tags: ["カップル", "2泊3日", "石川", "秋", "グルメ", "アート"],
  },
  {
    id: "hakone-onsen-relax",
    title: "箱根温泉 癒しの1泊2日",
    description:
      "東京から気軽に行ける温泉リゾート。露天風呂付き客室でゆったり、美術館巡りや芦ノ湖クルーズも。日頃の疲れを癒す大人の週末旅。",
    input: {
      destination: "箱根",
      isDestinationDecided: true,
      region: "domestic",
      dates: "1泊2日",
      companions: "カップル・夫婦",
      theme: ["温泉", "リラックス", "自然・絶景"],
      budget: "高め",
      pace: "ゆっくり",
      freeText:
        "温泉でゆっくり癒されたいです。露天風呂付きの部屋に泊まりたい。",
    },
    createdAt: "2025-01-15",
    tags: ["カップル", "1泊2日", "神奈川", "通年", "温泉", "リラックス"],
  },
  {
    id: "hiroshima-miyajima-peace",
    title: "広島・宮島 平和と世界遺産3泊4日",
    description:
      "原爆ドームと厳島神社、2つの世界遺産を巡る旅。平和への祈りを捧げ、瀬戸内海の絶景と広島グルメを満喫。お好み焼き、牡蠣、もみじ饅頭も。",
    input: {
      destination: "広島・宮島",
      isDestinationDecided: true,
      region: "domestic",
      dates: "3泊4日",
      companions: "家族（大人のみ）",
      theme: ["文化・歴史", "世界遺産", "グルメ"],
      budget: "中程度",
      pace: "普通",
      freeText:
        "世界遺産を巡りながら、広島の歴史と食文化を学びたいです。宮島では鹿とも触れ合いたい。",
    },
    createdAt: "2025-05-08",
    tags: ["家族旅行", "3泊4日", "広島", "春", "世界遺産", "文化体験"],
  },
  {
    id: "fukuoka-gourmet",
    title: "福岡 博多屋台とグルメ満喫1泊2日",
    description:
      "食の都・福岡で食べ歩き！博多ラーメン、もつ鍋、明太子はもちろん、夜は中洲の屋台で地元の雰囲気を楽しむ。太宰府天満宮への参拝も忘れずに。",
    input: {
      destination: "福岡（博多・天神・太宰府）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "1泊2日",
      companions: "友人",
      theme: ["グルメ", "文化・歴史", "ショッピング"],
      budget: "中程度",
      pace: "普通",
      freeText:
        "福岡の美味しいものを食べ尽くしたい！夜は屋台にも挑戦したいです。",
    },
    createdAt: "2025-09-12",
    tags: ["友人旅行", "1泊2日", "福岡", "通年", "グルメ", "屋台"],
  },
  {
    id: "osaka-usj-family",
    title: "大阪 USJと食い倒れ2泊3日",
    description:
      "家族で楽しむ大阪旅行！USJで一日中遊んだ後は、道頓堀でたこ焼きやお好み焼きを堪能。笑いとグルメがいっぱいの思い出作り。",
    input: {
      destination: "大阪",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "家族（子供あり）",
      theme: ["テーマパーク", "グルメ", "家族旅行"],
      budget: "高め",
      pace: "普通",
      freeText:
        "子供とUSJをメインに楽しみたい。大阪らしいグルメも食べたいです。",
    },
    createdAt: "2025-08-05",
    tags: ["家族旅行", "2泊3日", "大阪", "通年", "テーマパーク", "グルメ"],
  },
  {
    id: "nagoya-ghibli-family",
    title: "名古屋 ジブリパークと名古屋めし2泊3日",
    description:
      "話題のジブリパークを探索！ひつまぶし、味噌カツなどの名古屋めしも満喫。レゴランドや名古屋港水族館など、子供が喜ぶスポットも充実。",
    input: {
      destination: "愛知（名古屋・長久手）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "家族（子供あり）",
      theme: ["テーマパーク", "グルメ", "子供"],
      budget: "中程度",
      pace: "ゆっくり",
      freeText:
        "ジブリパークに行ってみたい！子供連れでも楽しめる名古屋観光もしたい。",
    },
    createdAt: "2025-10-20",
    tags: ["家族旅行", "2泊3日", "愛知", "通年", "テーマパーク", "グルメ"],
  },
  {
    id: "ise-shima-resort",
    title: "伊勢志摩 神宮参拝とリゾート2泊3日",
    description:
      "伊勢神宮で心を清め、賢島のリゾートホテルでゆったり。おかげ横丁での食べ歩きや、鳥羽水族館も楽しめる、大人のための休日プラン。",
    input: {
      destination: "伊勢・志摩",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "カップル・夫婦",
      theme: ["神社仏閣", "リゾート", "グルメ"],
      budget: "高め",
      pace: "ゆっくり",
      freeText:
        "伊勢神宮にお参りして、美味しい伊勢海老や松阪牛を食べたい。ゆっくりできるホテルが良い。",
    },
    createdAt: "2025-11-03",
    tags: ["カップル", "2泊3日", "三重", "通年", "神社仏閣", "リゾート"],
  },
  {
    id: "shikoku-udon-nature",
    title: "四国 うどん巡りと絶景3泊4日",
    description:
      "香川の讃岐うどんの名店を巡り、愛媛の道後温泉でほっこり。しまなみ海道の絶景ドライブや、高知のカツオのたたきも味わう四国周遊旅。",
    input: {
      destination: "四国（香川・愛媛・高知）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "3泊4日",
      companions: "友人",
      theme: ["グルメ", "温泉", "自然・絶景"],
      budget: "中程度",
      pace: "アクティブ",
      freeText:
        "美味しいうどん屋さんを何軒か巡りたい！道後温泉にも入りたいです。",
    },
    createdAt: "2025-05-25",
    tags: ["友人旅行", "3泊4日", "香川", "愛媛", "四国", "グルメ", "温泉"],
  },
  {
    id: "sendai-matsushima",
    title: "仙台・松島 絶景と牛タン1泊2日",
    description:
      "日本三景の一つ、松島の絶景を遊覧船から堪能。仙台では厚切りの牛タンやずんだ餅を味わう。歴史ある伊達政宗ゆかりのスポットも巡る旅。",
    input: {
      destination: "宮城（仙台・松島）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "1泊2日",
      companions: "カップル・夫婦",
      theme: ["自然・絶景", "グルメ", "文化・歴史"],
      budget: "中程度",
      pace: "普通",
      freeText: "松島のきれいな景色を見たい。本場の牛タンも楽しみ！",
    },
    createdAt: "2025-10-10",
    tags: ["カップル", "1泊2日", "宮城", "秋", "グルメ", "絶景"],
  },
  {
    id: "nagano-nature-retreat",
    title: "長野 軽井沢と松本城2泊3日",
    description:
      "避暑地・軽井沢でショッピングとカフェ巡り。国宝・松本城の雄姿に感動し、信州そばや新鮮な野菜料理など山の幸も楽しむリフレッシュ旅。",
    input: {
      destination: "長野（軽井沢・松本）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "カップル・夫婦",
      theme: ["自然・絶景", "ショッピング", "歴史"],
      budget: "中程度",
      pace: "ゆっくり",
      freeText:
        "自然の中でリフレッシュしたい。軽井沢のアウトレットと松本城に行きたい。",
    },
    createdAt: "2025-08-20",
    tags: ["カップル", "2泊3日", "長野", "夏", "自然", "ショッピング"],
  },
  {
    id: "kobe-port-nightview",
    title: "神戸 港町散策と夜景1泊2日",
    description:
      "異国情緒あふれる北野異人館街や南京町を散策。夜は「1000万ドルの夜景」と称される六甲山からの景色や、神戸牛ディナーでロマンチックに。",
    input: {
      destination: "神戸",
      isDestinationDecided: true,
      region: "domestic",
      dates: "1泊2日",
      companions: "カップル・夫婦",
      theme: ["夜景", "グルメ", "街歩き"],
      budget: "高め",
      pace: "普通",
      freeText:
        "おしゃれな神戸の街を歩きたい。夜景の見えるレストランで食事したい。",
    },
    createdAt: "2025-12-05",
    tags: ["カップル", "1泊2日", "兵庫", "冬", "夜景", "おしゃれ"],
  },
  {
    id: "kamakura-enoshima",
    title: "鎌倉・江ノ島 アジサイと海1泊2日",
    description:
      "古都・鎌倉で大仏や鶴岡八幡宮を参拝し、江ノ電に乗って江ノ島へ。海沿いのカフェでのんびりしたり、新鮮なしらす丼を食べたりする癒しの旅。",
    input: {
      destination: "鎌倉・江ノ島",
      isDestinationDecided: true,
      region: "domestic",
      dates: "1泊2日",
      companions: "友人",
      theme: ["神社仏閣", "海", "グルメ"],
      budget: "中程度",
      pace: "普通",
      freeText: "江ノ電に乗って海を見に行きたい。鎌倉のお寺巡りもしたい。",
    },
    createdAt: "2025-06-10",
    tags: ["友人旅行", "1泊2日", "神奈川", "初夏", "海", "散歩"],
  },
  {
    id: "beppu-yufuin-onsen",
    title: "別府・湯布院 温泉三昧2泊3日",
    description:
      "おんせん県・大分の2大温泉地を巡る。別府の地獄めぐりで迫力を体感し、湯布院の金鱗湖周辺を散策。最高の湯と豊後牛やとり天などの地元グルメを満喫。",
    input: {
      destination: "大分（別府・湯布院）",
      isDestinationDecided: true,
      region: "domestic",
      dates: "2泊3日",
      companions: "家族（大人のみ）",
      theme: ["温泉", "自然・絶景", "グルメ"],
      budget: "中程度",
      pace: "ゆっくり",
      freeText: "とにかく温泉でゆっくりしたい！地獄めぐりも見てみたい。",
    },
    createdAt: "2025-02-15",
    tags: ["家族旅行", "2泊3日", "大分", "冬", "温泉", "癒し"],
  },
  {
    id: "honolulu-resort",
    title: "ホノルル（ハワイ） リゾート満喫5泊7日",
    description:
      "常夏の楽園ハワイで過ごす、究極のリゾートステイ。ワイキキビーチでのんびり、ダイヤモンドヘッド登山で絶景を楽しみ、ショッピングやグルメも満喫。心身ともにリフレッシュするカップル・家族に人気のプラン。",
    input: {
      destination: "ホノルル",
      isDestinationDecided: true,
      region: "overseas",
      dates: "5泊7日",
      companions: "カップル・夫婦",
      theme: ["リゾート", "ビーチ・海", "ショッピング", "自然・絶景"],
      budget: "高め",
      pace: "ゆっくり",
      freeText:
        "ハワイの海を見ながらのんびりしたい。お買い物もグルメも楽しみたいです。",
    },
    createdAt: "2025-07-10",
    tags: ["カップル", "5泊7日", "ハワイ", "海外", "リゾート", "ビーチ"],
  },
  {
    id: "paris-art-culture",
    title: "パリ 芸術とロマンチックな街歩き5泊7日",
    description:
      "ルーヴル、オルセーなど世界的な美術館を巡り、エッフェル塔や凱旋門などの名所を訪れる。セーヌ川沿いの散策や、おしゃれなカフェでのひとときも楽しむ、パリの魔法にかかる旅。",
    input: {
      destination: "パリ",
      isDestinationDecided: true,
      region: "overseas",
      dates: "5泊7日",
      companions: "カップル・夫婦",
      theme: ["アート・美術館", "文化・歴史", "街歩き", "ロマンチック"],
      budget: "高め",
      pace: "普通",
      freeText:
        "憧れのパリで美術館巡りをしたい。美味しいパンやスイーツも食べたい。",
    },
    createdAt: "2025-05-20",
    tags: ["カップル", "5泊7日", "フランス", "ヨーロッパ", "海外", "アート"],
  },
  {
    id: "london-history-modern",
    title: "ロンドン 歴史とモダンが融合する街5泊7日",
    description:
      "大英博物館やバッキンガム宮殿で英国の伝統に触れ、ソーホーやショーディッチで最先端のカルチャーを感じる。ミュージカル鑑賞やアフタヌーンティーも欠かせない、刺激的なロンドン旅。",
    input: {
      destination: "ロンドン",
      isDestinationDecided: true,
      region: "overseas",
      dates: "5泊7日",
      companions: "友人",
      theme: ["文化・歴史", "ショッピング", "エンターテイメント", "都市観光"],
      budget: "高め",
      pace: "アクティブ",
      freeText:
        "ロンドンの観光名所を一通り見たい。ハリーポッターのスタジオツアーにも行きたい。",
    },
    createdAt: "2025-08-15",
    tags: ["友人旅行", "5泊7日", "イギリス", "ヨーロッパ", "海外", "都市観光"],
  },
  {
    id: "newyork-city-life",
    title: "ニューヨーク 世界の中心で刺激的な4泊6日",
    description:
      "タイムズスクエアの熱気、セントラルパークの憩い、ブロードウェイの興奮。美術館巡りや最新グルメも楽しむ、エネルギー溢れるニューヨークを体感する旅。",
    input: {
      destination: "ニューヨーク",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊6日",
      companions: "一人旅",
      theme: ["都市観光", "アート・美術館", "エンターテイメント", "グルメ"],
      budget: "高め",
      pace: "アクティブ",
      freeText:
        "ニューヨークの街を歩き回りたい。本場のミュージカルやジャズを楽しみたい。",
    },
    createdAt: "2025-09-10",
    tags: ["一人旅", "4泊6日", "アメリカ", "北米", "海外", "都市観光"],
  },
  {
    id: "rome-ancient-history",
    title: "ローマ 永遠の都で歴史散歩5泊7日",
    description:
      "コロッセオ、フォロ・ロマーノなど古代ローマの遺跡を巡り、バチカン市国で荘厳な芸術に触れる。本場のパスタやジェラートも堪能する、歴史好きにはたまらないローマの休日。",
    input: {
      destination: "ローマ",
      isDestinationDecided: true,
      region: "overseas",
      dates: "5泊7日",
      companions: "カップル・夫婦",
      theme: ["文化・歴史", "世界遺産", "グルメ", "街歩き"],
      budget: "中程度",
      pace: "普通",
      freeText:
        "ローマの遺跡を見て回りたい。美味しいイタリア料理もお腹いっぱい食べたい。",
    },
    createdAt: "2025-06-05",
    tags: ["カップル", "5泊7日", "イタリア", "ヨーロッパ", "海外", "歴史"],
  },
  {
    id: "barcelona-gaudi-art",
    title: "バルセロナ ガウディ建築と美食4泊6日",
    description:
      "サグラダ・ファミリアをはじめとするガウディの独創的な建築群を巡る。活気あるボケリア市場やバル巡りでタパスを味わう、情熱の街バルセロナを満喫する旅。",
    input: {
      destination: "バルセロナ",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊6日",
      companions: "友人",
      theme: ["アート・美術館", "グルメ", "建築", "街歩き"],
      budget: "中程度",
      pace: "普通",
      freeText:
        "ガウディの建築をたくさん見たい。夜はバルで美味しいタパスとお酒を楽しみたい。",
    },
    createdAt: "2025-10-25",
    tags: ["友人旅行", "4泊6日", "スペイン", "ヨーロッパ", "海外", "アート"],
  },
  {
    id: "bangkok-temple-food",
    title: "バンコク 黄金の寺院と屋台グルメ3泊5日",
    description:
      "ワット・アルンなどの荘厳な寺院を巡り、活気あふれるナイトマーケットでショッピングと屋台グルメを楽しむ。タイ式マッサージで癒やされる、エネルギッシュなバンコク旅。",
    input: {
      destination: "バンコク",
      isDestinationDecided: true,
      region: "overseas",
      dates: "3泊5日",
      companions: "友人",
      theme: ["グルメ", "文化・歴史", "ショッピング", "リラックス"],
      budget: "安め",
      pace: "普通",
      freeText:
        "安くて美味しいタイ料理をたくさん食べたい！マッサージも毎日行きたい。",
    },
    createdAt: "2025-11-15",
    tags: ["友人旅行", "3泊5日", "タイ", "アジア", "海外", "グルメ"],
  },
  {
    id: "seoul-kpop-beauty",
    title: "ソウル トレンドと美容・グルメ2泊3日",
    description:
      "明洞や弘大でショッピング、流行のカフェ巡り。本場の韓国焼肉や屋台フードを楽しみ、美容クリニックやコスメ探しも充実。週末サクッと行けるソウル女子旅。",
    input: {
      destination: "ソウル",
      isDestinationDecided: true,
      region: "overseas",
      dates: "2泊3日",
      companions: "友人",
      theme: ["グルメ", "ショッピング", "美容", "トレンド"],
      budget: "中程度",
      pace: "アクティブ",
      freeText:
        "コスメや服の買い物を楽しみたい。おしゃれなカフェにも行きたいです。",
    },
    createdAt: "2025-04-20",
    tags: ["友人旅行", "2泊3日", "韓国", "アジア", "海外", "ショッピング"],
  },
  {
    id: "taipei-nightmarket",
    title: "台北 夜市と千と千尋の世界2泊3日",
    description:
      "士林夜市などでB級グルメを食べ歩き。九份のノスタルジックな街並みを散策し、台北101からの夜景も楽しむ。近くて美味しい、台湾満喫の旅。",
    input: {
      destination: "台北",
      isDestinationDecided: true,
      region: "overseas",
      dates: "2泊3日",
      companions: "家族（子供あり）",
      theme: ["グルメ", "夜景", "文化・歴史", "街歩き"],
      budget: "安め",
      pace: "ゆっくり",
      freeText:
        "美味しい小籠包やかき氷を食べたい。九份に行って提灯の景色を見たい。",
    },
    createdAt: "2025-03-10",
    tags: ["家族旅行", "2泊3日", "台湾", "アジア", "海外", "グルメ"],
  },
  {
    id: "singapore-city-resort",
    title: "シンガポール 近未来都市とガーデン3泊5日",
    description:
      "マリーナベイ・サンズやガーデンズ・バイ・ザ・ベイなど近未来的なスポットを巡る。多民族国家ならではの多様なグルメや、セントーサ島でのレジャーも楽しむ旅。",
    input: {
      destination: "シンガポール",
      isDestinationDecided: true,
      region: "overseas",
      dates: "3泊5日",
      companions: "家族（子供あり）",
      theme: ["都市観光", "テーマパーク", "グルメ", "夜景"],
      budget: "高め",
      pace: "普通",
      freeText:
        "マーライオンを見たい。子供と一緒に動物園や植物園を楽しみたい。",
    },
    createdAt: "2025-08-01",
    tags: ["家族旅行", "3泊5日", "シンガポール", "アジア", "海外", "都市観光"],
  },
  {
    id: "sydney-harbour-nature",
    title: "シドニー オペラハウスと美しい港4泊6日",
    description:
      "世界遺産オペラハウスを眺め、ボンダイビーチで海風を感じる。コアラやカンガルーとの触れ合いや、ブルーマウンテンズへの小旅行も楽しむ、オーストラリアの自然と都市の融合。",
    input: {
      destination: "シドニー",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊6日",
      companions: "カップル・夫婦",
      theme: ["自然・絶景", "都市観光", "ビーチ・海", "動物"],
      budget: "高め",
      pace: "ゆっくり",
      freeText:
        "オペラハウスを見たい。オーストラリアならではの動物に会いたい。",
    },
    createdAt: "2025-12-01",
    tags: [
      "カップル",
      "4泊6日",
      "オーストラリア",
      "オセアニア",
      "海外",
      "自然",
    ],
  },
  {
    id: "vancouver-nature-city",
    title: "バンクーバー 自然と都市のハーモニー4泊6日",
    description:
      "スタンレーパークでのサイクリング、グランビルアイランドでのショッピング。海と山に囲まれた美しい都市で、アウトドアと都会的な楽しみを両立するカナダの旅。",
    input: {
      destination: "バンクーバー",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊6日",
      companions: "友人",
      theme: ["自然・絶景", "街歩き", "グルメ", "アクティビティ"],
      budget: "中程度",
      pace: "普通",
      freeText: "自然の中で体を動かしたい。美味しいシーフードも食べたいです。",
    },
    createdAt: "2025-07-25",
    tags: ["友人旅行", "4泊6日", "カナダ", "北米", "海外", "自然"],
  },
  {
    id: "losangeles-movie-beach",
    title: "ロサンゼルス 映画の都とビーチカルチャー4泊6日",
    description:
      "ハリウッドで映画の世界に浸り、サンタモニカビーチで西海岸の風を感じる。ビバリーヒルズでの散策や、テーマパークも楽しむエンターテイメント満載の旅。",
    input: {
      destination: "ロサンゼルス",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊6日",
      companions: "友人",
      theme: [
        "テーマパーク",
        "エンターテイメント",
        "ビーチ・海",
        "ショッピング",
      ],
      budget: "高め",
      pace: "アクティブ",
      freeText:
        "ハリウッドサインを見たい。ディズニーランドかユニバに行きたい。",
    },
    createdAt: "2025-09-20",
    tags: ["友人旅行", "4泊6日", "アメリカ", "北米", "海外", "エンタメ"],
  },
  {
    id: "bali-spirit-retreat",
    title: "バリ島 神々の島で癒やしのリゾート3泊5日",
    description:
      "ウブドの棚田や寺院を巡り、伝統舞踊を鑑賞。ビーチリゾートでのんびり過ごし、スパで心身を癒やす。スピリチュアルな空気に包まれる極上の休息。",
    input: {
      destination: "バリ島",
      isDestinationDecided: true,
      region: "overseas",
      dates: "3泊5日",
      companions: "一人旅",
      theme: ["リゾート", "リラックス", "文化・歴史", "自然・絶景"],
      budget: "中程度",
      pace: "ゆっくり",
      freeText:
        "とにかくのんびりしたい。ヨガをしたり、スパでマッサージを受けたい。",
    },
    createdAt: "2025-06-30",
    tags: ["一人旅", "3泊5日", "インドネシア", "アジア", "海外", "リゾート"],
  },
  {
    id: "danang-hoian-resort",
    title: "ダナン・ホイアン ビーチとランタンの街3泊5日",
    description:
      "ダナンの美しいビーチでリゾートを満喫し、世界遺産ホイアンのランタンが彩る幻想的な夜景を楽しむ。ベトナム中部の魅力を凝縮した、フォトジェニックな旅。",
    input: {
      destination: "ダナン・ホイアン",
      isDestinationDecided: true,
      region: "overseas",
      dates: "3泊5日",
      companions: "友人",
      theme: ["ビーチ・海", "世界遺産", "夜景", "グルメ"],
      budget: "安め",
      pace: "普通",
      freeText:
        "きれいな海で泳ぎたい。ホイアンのランタン祭りのような景色が見たい。",
    },
    createdAt: "2025-05-10",
    tags: ["友人旅行", "3泊5日", "ベトナム", "アジア", "海外", "リゾート"],
  },
  {
    id: "dubai-future-luxury",
    title: "ドバイ 砂漠と摩天楼のラグジュアリー3泊5日",
    description:
      "世界一高いビル・ブルジュハリファからの眺望、巨大モールでのショッピング。砂漠サファリでの冒険も楽しむ、驚きと興奮に満ちたアラビアンナイト。",
    input: {
      destination: "ドバイ",
      isDestinationDecided: true,
      region: "overseas",
      dates: "3泊5日",
      companions: "カップル・夫婦",
      theme: ["都市観光", "ショッピング", "砂漠", "ラグジュアリー"],
      budget: "高め",
      pace: "アクティブ",
      freeText: "世界一の景色を見たい。砂漠でラクダに乗りたい。",
    },
    createdAt: "2025-11-25",
    tags: ["カップル", "3泊5日", "UAE", "中東", "海外", "ラグジュアリー"],
  },
  {
    id: "istanbul-east-west",
    title: "イスタンブール 東洋と西洋の交差点4泊7日",
    description:
      "アジアとヨーロッパに跨る歴史都市。ブルーモスクやアヤソフィアの壮麗な建築に圧倒され、グランドバザールで異国情緒を味わう。ボスポラス海峡クルーズも魅力。",
    input: {
      destination: "イスタンブール",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊7日",
      companions: "一人旅",
      theme: ["文化・歴史", "世界遺産", "街歩き", "グルメ"],
      budget: "中程度",
      pace: "普通",
      freeText: "モスクの美しい建築を見たい。バザールで雑貨を探したい。",
    },
    createdAt: "2025-10-15",
    tags: ["一人旅", "4泊7日", "トルコ", "ヨーロッパ", "海外", "歴史"],
  },
  {
    id: "cairo-pyramid-mystery",
    title: "カイロ 悠久のナイルとピラミッド4泊7日",
    description:
      "ギザの三大ピラミッドとスフィンクスに対面する感動。エジプト考古学博物館で古代の秘宝に触れ、ハン・ハリーリ市場で活気を感じる。古代文明の謎に迫る冒険。",
    input: {
      destination: "カイロ",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊7日",
      companions: "友人",
      theme: ["文化・歴史", "世界遺産", "冒険", "絶景"],
      budget: "中程度",
      pace: "アクティブ",
      freeText: "ピラミッドをこの目で見たい！ラクダにも乗ってみたい。",
    },
    createdAt: "2025-12-10",
    tags: ["友人旅行", "4泊7日", "エジプト", "アフリカ", "海外", "冒険"],
  },
  {
    id: "santorini-aegean-blue",
    title: "サントリーニ島 青と白の絶景リゾート4泊7日",
    description:
      "断崖絶壁に並ぶ白い家々と青いドームの教会。エーゲ海を見下ろす絶景カフェでくつろぎ、世界一とも言われるイアの夕日を眺める。ハネムーンにも最適なロマンチックな島。",
    input: {
      destination: "サントリーニ島",
      isDestinationDecided: true,
      region: "overseas",
      dates: "4泊7日",
      companions: "カップル・夫婦",
      theme: ["リゾート", "絶景", "ロマンチック", "海"],
      budget: "高め",
      pace: "ゆっくり",
      freeText:
        "白い街並みと青い海の写真を撮りたい。夕日を見ながらゆっくり食事したい。",
    },
    createdAt: "2025-06-25",
    tags: ["カップル", "4泊7日", "ギリシャ", "ヨーロッパ", "海外", "リゾート"],
  },
  {
    id: "machu-picchu-adventure",
    title: "マチュピチュ 天空の遺跡を目指す旅5泊8日",
    description:
      "アンデスの山奥に潜むインカ帝国の遺跡マチュピチュへ。クスコの街並みや聖なる谷も巡り、南米の壮大な自然と謎多き歴史に触れる一生に一度の感動体験。",
    input: {
      destination: "マチュピチュ・クスコ",
      isDestinationDecided: true,
      region: "overseas",
      dates: "5泊8日",
      companions: "友人",
      theme: ["世界遺産", "冒険", "文化・歴史", "絶景"],
      budget: "高め",
      pace: "アクティブ",
      freeText: "マチュピチュ遺跡に行ってみたい。アルパカにも会いたい。",
    },
    createdAt: "2025-09-05",
    tags: ["友人旅行", "5泊8日", "ペルー", "南米", "海外", "世界遺産"],
  },
];

/**
 * IDでサンプルプランを取得
 */
export function getSamplePlanById(id: string): SamplePlan | undefined {
  return samplePlans.find((plan) => plan.id === id);
}

/**
 * タグでサンプルプランをフィルタリング
 */
export function filterSamplePlansByTags(tags: string[]): SamplePlan[] {
  if (tags.length === 0) return samplePlans;
  return samplePlans.filter((plan) =>
    tags.some((tag) => plan.tags.includes(tag))
  );
}

/**
 * 日数でサンプルプランをフィルタリング
 */
export function filterSamplePlansByDays(days: number | null): SamplePlan[] {
  if (days === null) return samplePlans;
  return samplePlans.filter((plan) => getDays(plan.input.dates) === days);
}

/**
 * 地域タグのリスト（都道府県・地域名）
 */
export const regionTags = [
  "北海道",
  "東京",
  "神奈川",
  "石川",
  "京都",
  "奈良",
  "広島",
  "沖縄",
];

/**
 * 全てのユニークなタグを取得（地域タグを除く）
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  samplePlans.forEach((plan) => {
    plan.tags.forEach((tag) => {
      if (!regionTags.includes(tag)) {
        tagSet.add(tag);
      }
    });
  });
  return Array.from(tagSet).sort();
}

/**
 * プランに含まれる地域タグを取得
 */
export function getAllRegions(): string[] {
  const regionSet = new Set<string>();
  samplePlans.forEach((plan) => {
    plan.tags.forEach((tag) => {
      if (regionTags.includes(tag)) {
        regionSet.add(tag);
      }
    });
  });
  return Array.from(regionSet);
}

/**
 * 地域からエリア名を取得（グルーピング用）
 */
export function getAreaFromRegion(region: string): string {
  const areaMap: Record<string, string> = {
    北海道: "北海道",
    東京: "関東",
    神奈川: "関東",
    石川: "北陸",
    京都: "関西",
    奈良: "関西",
    広島: "中国",
    沖縄: "沖縄",
  };
  return areaMap[region] || region;
}
