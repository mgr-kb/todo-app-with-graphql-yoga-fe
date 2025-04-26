---
description: 
globs: 
alwaysApply: false
---

あなたは TypeScript、Node.js、Next.js 15 App Router、React、Vite、Shadcn UI、Radix UI、Tailwind Aria のエキスパートです。

【主要原則】
- 簡潔かつ技術的に正確な TypeScript のサンプルを用いて回答する。
- 関数型・宣言的プログラミングを採用する。クラスは避ける。
- 重複を避け、イテレーションとモジュール化を優先する。
- 補助動詞（例：isLoading）を使った説明的な変数名を使う。
- ディレクトリ名は小文字とハイフンを使う（例：components/auth-wizard）。
- コンポーネントは名前付きエクスポートを優先する。
- 「オブジェクトを受け取り、オブジェクトを返す」（ROROパターン）を使う。

【JavaScript/TypeScript】
- 純粋関数には "function" キーワードを使う。セミコロンは省略する。
- 全てのコードを TypeScript で書く。type より interface を好む。enum は避け、代わりにマップを使用する。
- ファイル構成順は、エクスポートコンポーネント → サブコンポーネント → ヘルパー → 静的コンテンツ → 型定義。
- 条件文に不要な波括弧 `{}` を使わない。
- 単一行の条件文では波括弧を省略する。
- 簡単な条件式は一行で書く（例：`if (condition) doSomething()`）。

【エラーハンドリング・バリデーション】
- エラーハンドリングとエッジケース対応を最優先する。
  - 関数の最初でエラーやエッジケースを処理する。
  - 深いネストを避けるため、エラー条件では早期リターンする。
  - 関数の最後に「ハッピーパス」を置くことで読みやすくする。
  - 不要な else 文は避け、if-returnパターンを使う。
  - 前提条件や無効な状態を早期に処理するガード節を使う。
  - 適切なエラーロギングとユーザーフレンドリーなエラーメッセージを実装する。
  - 一貫したエラーハンドリングのために、カスタムエラータイプやエラーファクトリーを検討する。

【React/Next.js】
- 関数コンポーネントと TypeScript インターフェースを使う。
- 宣言的な JSX を使用する。
- コンポーネントは const ではなく function で定義する。
- Shadcn UI、Radix、Tailwind Aria を使ってコンポーネントとスタイリングを行う。
- Tailwind CSS でレスポンシブデザインを実装する。
- モバイルファーストのアプローチを取る。
- 静的コンテンツとインターフェースはファイルの末尾に置く。
- 静的コンテンツはレンダリング関数の外側でコンテンツ変数として定義する。
- 'use client'、'useEffect'、'setState'の使用は最小限にする。基本は RSC（React Server Components）を推奨。
- `page.tsx` ファイルでは 'use client' を使わない。
- フォームバリデーションには Zod を使う。
- クライアントコンポーネントは Suspense でラップし、フォールバックを用意する。
- 重要度の低いコンポーネントは動的読み込みする。
- 画像は WebP 形式、サイズデータ指定、遅延読み込みを行う。
- **期待されるエラー**は戻り値で扱う：Server Actions 内では try/catch を使わず、`useActionState` でエラーをクライアントに返す。
- **予期しないエラー**にはエラーバウンダリを使う：error.tsx、global-error.tsx を実装し、フォールバックUIを提供する。
- フォームバリデーションでは react-hook-form と useActionState を組み合わせて使う。
- `services/`ディレクトリのコードは必ずユーザーフレンドリーなエラーを throw し、tanStackQuery によってユーザーに表示できるようにする。
- Server Actions は必ず next-safe-action を使う：
  - 適切なバリデーションで型安全な Server Actions を実装する。
  - `next-safe-action` の `action` 関数を使ってアクションを作成する。
  - Zod を使って入力スキーマを定義し、強固な型チェックとバリデーションを行う。
  - エラーを適切に処理し、適切なレスポンスを返す。
  - `import type { ActionResponse } from '@/types/actions'` を使う。
  - すべての Server Actions は ActionResponse 型を返す。
  - 成功・失敗時のレスポンス処理を一貫させる。

【主要な規約】
1. 状態管理には Next.js の App Router を使用する。
2. Web Vitals（LCP、CLS、FID）を最優先する。
3. 'use client' 使用を最小限にする：
   - サーバーコンポーネントと Next.js の SSR 機能を優先する。
   - Web API にアクセスする小さなコンポーネントでのみ 'use client' を使う。
   - データ取得や状態管理には 'use client' を使わない。

Next.js公式ドキュメントのデータ取得、レンダリング、ルーティングのベストプラクティスも参照すること。
