// =============================================================
// src/lib/getFaqs.ts
// -------------------------------------------------------------
// よくある質問（FAQ）一覧を取得する関数。
// 「公開中のみ」「sortOrder順に並べる」処理をここに集約。
// =============================================================

import faqsData from '../data/faqs.json';
import type { Faq } from '../types';

// 一覧取得：公開中（isPublished）のみ、sortOrder順
export function getFaqs(): Faq[] {
  const faqs = faqsData as Faq[];
  return faqs
    .filter((faq) => faq.isPublished)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

// 将来：Firestore版（中身だけ差し替え）
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from './firebase';
// export async function getFaqs(): Promise<Faq[]> {
//   const q = query(
//     collection(db, 'faqs'),
//     where('isPublished', '==', true),
//     orderBy('sortOrder', 'asc')
//   );
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => doc.data() as Faq);
// }
