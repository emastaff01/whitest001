// =============================================================
// src/lib/fairContentIcons.ts
// -------------------------------------------------------------
// フェア「体験できること」(fair-contents) のアイコンを「ファイル」で管理する。
// public/images/icons/ に置いた .svg を使う。ファイル名（拡張子なし）＝アイコンキー。
//   例: public/images/icons/ceremony.svg → キー "ceremony"
// icon フィールドにはこのキー（＝ファイル名）を保存する（従来の値とそのまま互換）。
// 未設定・未知キーは default.svg にフォールバックする。
// アイコン追加＝このフォルダに .svg を置いて再ビルドするだけ（開発者の作業＝権限差を担保）。
// 注意: fs を使うので必ずビルド時（.astro の frontmatter）からのみ import すること。
//       ブラウザ用 script からは import 禁止（代わりに JSON島でデータを渡す）。
// =============================================================
import fs from 'node:fs';
import * as path from 'path';

const ICON_DIR = 'public/images/fair-icons';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // 末尾スラッシュ除去（例 '/test-whi'）

// アイコン1件分（key＝拡張子なしファイル名／url＝base付き表示パス）。
export type IconEntry = { key: string; url: string };

// public/images/icons/ の .svg をビルド時に列挙する（default.svg も含む）。
export const listIcons = (): IconEntry[] => {
  if (!fs.existsSync(ICON_DIR)) return [];
  return fs
    .readdirSync(ICON_DIR)
    .filter((f) => f.toLowerCase().endsWith('.svg'))
    .sort()
    .map((f) => ({ key: f.replace(/\.svg$/i, ''), url: `${BASE}/images/fair-icons/${f}` }));
};

// キー → 表示URL（base付き）。未知キー・空文字は default にフォールバック。
// icons には listIcons() の結果を渡す（存在チェックに使う）。
export const iconUrlFor = (key: string, icons: IconEntry[]): string => {
  const hit = key ? icons.find((i) => i.key === key) : undefined;
  if (hit) return hit.url;
  const def = icons.find((i) => i.key === 'default');
  return def ? def.url : `${BASE}/images/fair-icons/default.svg`; // 一覧に無くても default を指す
};


// =============================================================
// バナー画像一覧（public/images/banners/ の .jpg を列挙）
// frontmatter 限定 import。client script から使わないこと（fs は Node 専用）。
// =============================================================
export function listBannerImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'banners');
  // フォルダが存在しない場合は空配列を返す（ビルドエラーを防ぐ）
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.jpg')) // .webp は除外（.jpg が正本）
    .sort();                            // ファイル名のアルファベット順
}