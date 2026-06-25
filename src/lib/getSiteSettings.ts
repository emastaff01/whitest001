// =============================================================
// src/lib/getSiteSettings.ts
// -------------------------------------------------------------
// サイト共通設定（NAP情報など）を取得する関数。
//
// 【設計の意図】
// 画面側（.astroファイル）は「getSiteSettings() を呼ぶ」とだけ覚えればよく、
// 中のデータがJSONなのかFirestoreなのかを意識しなくて済みます。
// 本番でFirestoreに切り替える時は、この関数の「中身」だけ差し替えます。
// 呼び出し側のコードは一切変更不要です。
// =============================================================

import siteSettingsData from '../data/site-settings.json';
import type { SiteSettings } from '../types';

// 今：静的JSONをそのまま返すだけ
export function getSiteSettings(): SiteSettings {
  return siteSettingsData as SiteSettings;
}

// 将来：Firestore版（中身だけ差し替え・呼び出し側は変更不要）
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from './firebase';
// export async function getSiteSettings(): Promise<SiteSettings> {
//   const snap = await getDoc(doc(db, 'site_settings', 'main'));
//   return snap.data() as SiteSettings;
// }
