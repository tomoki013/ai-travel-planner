# コーディング規約

このドキュメントでは、Tabidea プロジェクトのコーディング規約とディレクトリ構造について定義します。

## ディレクトリ構造

```
src/
├── app/                    # Next.js App Router (globals.css はここ)
│   ├── (marketing)/        # マーケティングページ群
│   ├── (planner)/          # 旅行プランナー機能群
│   └── (info)/             # 情報系機能群
├── components/
│   ├── ui/                 # 汎用UI（Atoms）- ビジネスロジックなし
│   ├── common/             # 共通コンポーネント（Molecules）
│   └── features/           # 機能別コンポーネント（Organisms）
│       ├── planner/
│       ├── travel-info/
│       ├── samples/
│       └── landing/
├── lib/
│   ├── services/           # ビジネスロジック
│   ├── utils/              # ユーティリティ
│   ├── hooks/              # カスタムフック
│   └── constants/          # 定数
├── types/                  # 型定義（統合）
└── data/                   # 静的データ
```

## 命名規則

| 種類 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `CategorySelector.tsx` |
| フック | camelCase + use | `useItinerary.ts` |
| ユーティリティ | kebab-case | `http-client.ts` |
| 型定義ファイル | kebab-case | `travel-info.ts` |
| テスト | 元ファイル名 + .test | `Button.test.tsx` |
| 変数・関数 | camelCase | `userName`, `formatDate` |
| 定数 | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 型・インターフェース | PascalCase | `UserInput`, `TravelInfo` |

## インポート順序

ファイル内のインポートは以下の順序で記述します。各グループ間は空行で区切ります。

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. 外部ライブラリ（アルファベット順）
import { generateText } from 'ai';
import { z } from 'zod';

// 3. 型（import type）
import type { UserInput, Itinerary } from '@/types';

// 4. サービス・ユーティリティ
import { GeminiService } from '@/lib/services/ai';
import { formatDate } from '@/lib/utils';

// 5. フック
import { useItinerary } from '@/lib/hooks';

// 6. コンポーネント
import { Button, Card } from '@/components/ui';
import { Header } from '@/components/common';

// 7. 相対インポート
import { localHelper } from './helpers';
```

## コンポーネント分類基準

| 配置場所 | 基準 | 例 |
|----------|------|-----|
| `ui/` | ビジネスロジックなし、汎用再利用可能 | Button, Input, Card, Badge, Modal |
| `common/` | アプリ全体で使用、軽いロジック可 | Header, Footer, LoadingSpinner, ErrorBoundary |
| `features/` | 特定機能に紐づく | WizardStep, CategorySelector, ItineraryDay |

### 分類の判断基準

- **ui/**: 他のプロジェクトでもそのまま使えるか？ → Yes なら ui/
- **common/**: このアプリの複数の機能で使うか？ → Yes なら common/
- **features/**: 特定の機能でのみ使うか？ → Yes なら features/{機能名}/

## コンポーネントディレクトリ構造

コンポーネントは以下の構造で配置します。

```
ComponentName/
├── ComponentName.tsx       # 本体
├── ComponentName.test.tsx  # テスト（コロケーション）
├── types.ts                # 型定義（オプション、複雑な場合のみ）
└── index.ts                # バレルエクスポート
```

### index.ts の例

```typescript
// src/components/ui/Button/index.ts
export { default } from './Button';
export type { ButtonProps } from './Button';
```

### バレルエクスポート（ディレクトリ全体）

```typescript
// src/components/ui/index.ts
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
// ...
```

## 型定義の配置ルール

| 配置場所 | 使用条件 | 例 |
|----------|----------|-----|
| `src/types/` | 複数モジュールで共有される型 | `UserInput`, `Itinerary`, `TravelInfo` |
| 機能内 `types.ts` | その機能内のみで使用 | `WizardStepProps`, `CategoryState` |
| ファイル内 | 1ファイル内のみで使用 | ローカルなヘルパー型 |

### src/types/ の構造

```
src/types/
├── itinerary.ts       # 旅程関連型
├── travel-info.ts     # 渡航情報関連型
├── user-input.ts      # ユーザー入力型
├── api.ts             # API関連型
├── common.ts          # 共通ユーティリティ型
└── index.ts           # 統合エクスポート
```

## テストルール

### コロケーション戦略

テストファイルはソースファイルと同じディレクトリに配置します。

```
src/lib/utils/
├── date.ts
├── date.test.ts       # 同じディレクトリに配置
├── string.ts
└── string.test.ts
```

### テストファイルの命名

- 単体テスト: `*.test.ts` または `*.test.tsx`
- E2Eテスト: `tests/e2e/*.spec.ts`

### カバレッジ目標

| モジュール | 目標カバレッジ |
|-----------|---------------|
| 全体 | 70% |
| サービス層 (`lib/services/`) | 80% |
| ユーティリティ (`lib/utils/`) | 90% |
| コンポーネント | 60% |

### テストの書き方（AAA パターン）

```typescript
describe('formatDate', () => {
  it('日付を指定されたフォーマットで文字列に変換する', () => {
    // Arrange（準備）
    const date = new Date('2024-01-15');
    const format = 'YYYY-MM-DD';

    // Act（実行）
    const result = formatDate(date, format);

    // Assert（検証）
    expect(result).toBe('2024-01-15');
  });
});
```

## JSDoc

関数・コンポーネントには JSDoc コメントを追加します。

### 関数の例

```typescript
/**
 * 日付を指定されたフォーマットで文字列に変換する
 * @param date - 変換する日付オブジェクト
 * @param format - 出力フォーマット（例: 'YYYY-MM-DD'）
 * @returns フォーマットされた日付文字列
 */
export function formatDate(date: Date, format: string): string {
  // 実装
}
```

### コンポーネントの例

```typescript
/**
 * 旅行プランのカードコンポーネント
 * @param props.title - プランのタイトル
 * @param props.destination - 目的地
 * @param props.onSelect - 選択時のコールバック
 */
export function TravelPlanCard({ title, destination, onSelect }: TravelPlanCardProps) {
  // 実装
}
```

## 定数の管理

定数は `src/lib/constants/` に集約します。

### ファイル構造

```
src/lib/constants/
├── routes.ts          # ルート定義
├── config.ts          # アプリ設定
├── api.ts             # API関連定数
├── travel-info.ts     # 渡航情報関連定数
└── index.ts           # 統合エクスポート
```

### 定数の書き方

```typescript
// src/lib/constants/config.ts
export const APP_CONFIG = {
  APP_NAME: 'Tabidea',
  APP_URL: 'https://ai.tomokichidiary.com',
  DEFAULT_LANGUAGE: 'ja',
} as const;

export const AI_CONFIG = {
  MODEL_NAME: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  TEMPERATURE: 0.35,
  MAX_RETRIES: 3,
} as const;
```

## サービス層の構造

ビジネスロジックは `src/lib/services/` に配置します。

```
src/lib/services/
├── ai/
│   ├── gemini.ts
│   ├── gemini.test.ts
│   ├── prompts/
│   └── index.ts
├── rag/
│   ├── pinecone-retriever.ts
│   └── index.ts
├── travel-info/
│   ├── travel-info-service.ts
│   ├── cache/
│   ├── sources/
│   └── index.ts
└── index.ts
```

## エラーハンドリング

### カスタムエラークラス

```typescript
export class TravelInfoError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'TravelInfoError';
  }
}
```

### エラーの伝播

- サービス層でキャッチし、適切なエラー型に変換
- UIでは `ErrorBoundary` でキャッチして表示

## コード品質チェック

### Linting

```bash
pnpm lint          # ESLintを実行
```

### Type Check

```bash
pnpm build         # TypeScriptの型チェックを含む
```

### テスト

```bash
pnpm test          # 単体テストを実行
pnpm test:coverage # カバレッジレポート付きで実行
```
