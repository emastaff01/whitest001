// =============================================================
// src/lib/getFairs.ts
// -------------------------------------------------------------
// ブライダルフェア一覧を取得する関数。
// 「公開中だけに絞る」「表示順に並べる」というルールを
// この関数の中にまとめておくと、画面側がシンプルになります。
// =============================================================

import fairsData from '../data/fairs.json';
import type { Fair } from '../types';

// 一覧取得：公開中（isPublished）のみ、sortOrder順に並べて返す
export function getFairs(): Fair[] {
  const fairs = fairsData as Fair[];
  return fairs
    .filter((fair) => fair.isPublished) // 下書き（非公開）は除外
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)); // 小さい順に表示
}

// 1件取得：詳細ページ /fair/[id] 用。見つからなければ undefined
export function getFairById(id: string): Fair | undefined {
  return getFairs().find((fair) => fair.id === id);
}

// 将来：Firestore版（中身だけ差し替え）
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from './firebase';
// export async function getFairs(): Promise<Fair[]> {
//   const q = query(
//     collection(db, 'fairs'),
//     where('isPublished', '==', true),
//     orderBy('sortOrder', 'asc')
//   );
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => doc.data() as Fair);
// }
