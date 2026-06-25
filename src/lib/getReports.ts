// =============================================================
// src/lib/getReports.ts
// -------------------------------------------------------------
// ウェディングレポート（旧:卒花レポート）一覧を取得する関数。
// クライアントが後からCMSで追加していく想定のデータです。
// =============================================================

import reportsData from '../data/reports.json';
import type { Report } from '../types';

// 一覧取得：公開中のみ、sortOrder順
export function getReports(): Report[] {
  const reports = reportsData as Report[];
  return reports
    .filter((report) => report.isPublished)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

// 1件取得：詳細ページ /report/[id] 用
export function getReportById(id: string): Report | undefined {
  return getReports().find((report) => report.id === id);
}

// 将来：Firestore版（中身だけ差し替え）
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from './firebase';
// export async function getReports(): Promise<Report[]> {
//   const q = query(
//     collection(db, 'reports'),
//     where('isPublished', '==', true),
//     orderBy('sortOrder', 'asc')
//   );
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => doc.data() as Report);
// }
