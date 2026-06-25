// =============================================================
// src/lib/getPosts.ts
// -------------------------------------------------------------
// お知らせ（NEWS / Post）一覧を取得する関数。
// ・公開中のみ（予約投稿・予約非公開の期間も判定する）
// ・publishedAt の降順（新しい順）に並べる
// =============================================================

import postsData from '../data/posts.json';
import type { Post } from '../types';

// 現在時刻を日本時間(JST)の 'YYYY-MM-DDTHH:mm' 文字列で返すヘルパー。
// ・publishStartAt / publishEndAt（datetime-local の値）と同じ形にそろえ、
//   文字列どうしの比較で「予約日時を過ぎたか」を判定するため。
// ・toISOString() は UTC になり JST と9時間ズレるので使わない。
//   getTime()（＝UTCの絶対時刻）に9時間足して UTC ゲッターで読むと、
//   ビルドがJSTのMacでもUTCのCIサーバーでも、確実にJSTの年月日時分になる。
function nowStampJST(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC基準に+9時間ずらす
  const p = (n: number) => String(n).padStart(2, '0');      // 9 -> "09" の0埋め
  return `${jst.getUTCFullYear()}-${p(jst.getUTCMonth() + 1)}-${p(jst.getUTCDate())}` +
    `T${p(jst.getUTCHours())}:${p(jst.getUTCMinutes())}`;
}

// 一覧取得：公開中のみ（予約期間を考慮）、publishedAt 降順
export function getPosts(): Post[] {
  const posts = postsData as Post[];
  const now = nowStampJST(); // ビルドした瞬間の現在時刻（JST）

  return posts
    .filter((post) => {
      // 1) 非公開フラグが立っていたら出さない
      if (!post.isPublished) return false;
      // 2) 予約投稿：開始日時が未来ならまだ出さない
      //    （未設定 or 今が開始日時以降なら通す）
      if (post.publishStartAt && now < post.publishStartAt) return false;
      // 3) 予約非公開：終了日時を過ぎていたら出さない
      //    （未設定 or 今が終了日時より前なら通す）
      if (post.publishEndAt && now >= post.publishEndAt) return false;
      return true;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}