// =============================================================
// src/lib/getPlans.ts
// -------------------------------------------------------------
// 結婚式プラン一覧を取得する関数。
// =============================================================

import plansData from '../data/plans.json';
import type { Plan } from '../types';

// 一覧取得：公開中のみ、sortOrder順
export function getPlans(): Plan[] {
  const plans = plansData as Plan[];
  return plans
    .filter((plan) => plan.isPublished)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

// 1件取得：詳細ページ /plan/[id] 用
export function getPlanById(id: string): Plan | undefined {
  return getPlans().find((plan) => plan.id === id);
}

// 将来：Firestore版（中身だけ差し替え）
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from './firebase';
// export async function getPlans(): Promise<Plan[]> {
//   const q = query(
//     collection(db, 'plans'),
//     where('isPublished', '==', true),
//     orderBy('sortOrder', 'asc')
//   );
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => doc.data() as Plan);
// }
