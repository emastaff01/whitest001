// =============================================================
// src/lib/admin.ts
// -------------------------------------------------------------
// 管理画面のパネル全体で使い回す「共通処理」を集める場所。
// =============================================================
// -------------------------------------------------------------
// textarea（1行=1項目）→ 文字列配列。
// 各行の前後空白を除去し、空行は捨てる。タグや特典の入力欄で使う。
// -------------------------------------------------------------
export const linesToArr = (text: string): string[] =>
  text
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

// -------------------------------------------------------------
// 文字列配列 → textarea用テキスト（1行=1項目）。
// undefined のときは空文字を返す（任意項目が未設定でも安全に表示できる）。
// -------------------------------------------------------------
export const arrToLines = (arr: string[] | undefined): string => (arr ?? []).join('\n');

// 公開/非公開の件数を数えて表示用の文字列にする
// items は isPublished を持つ配列（Fair/Plan/Post/Report 共通）。
// 公開＝isPublished が true のもの。それ以外（false・未設定）は非公開として数える。
export function countLabel(items: { isPublished?: boolean }[]): string {
  const published = items.filter((it) => it.isPublished === true).length;
  const unpublished = items.length - published;
  return `（公開：${published}件／非公開：${unpublished}件）`;
}


// 記事の doc.id を自動発番する共通ヘルパー。
// フェア/プラン/お知らせ/レポートの4パネルにて使用
// 呼ぶのは「新規作成」のみ、編集時は絶対に呼ばない
// 戻り値の例: "f-20260616-094512-a3"
export function makeDocId(prefix: string): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0'); // 1桁を0埋めして2桁にそろえる（6 → "06"）

  const y  = now.getFullYear();
  const m  = pad(now.getMonth() + 1); // getMonth() は0始まりなので +1 する
  const d  = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  // 同じ「秒」に2件作った場合の万一の重複を避けるための短いランダム2文字
  // 2文字保証（URL使用のため、記号不可）
  const rand = Math.random().toString(36).slice(2, 4).padEnd(2, '0');

  return `${prefix}-${y}${m}${d}-${hh}${mm}${ss}-${rand}`;
}


