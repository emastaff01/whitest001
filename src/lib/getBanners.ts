// =============================================================
// src/lib/getBanners.ts
// -------------------------------------------------------------
// TOPページのバナースライダー用データを取得する関数。
// 既存の getPlans / getReports と同じ「3層設計」に合わせています:
//   画面（BannerSlider）→ この get関数 → データ（banners.json）
// 「公開中だけ」「sortOrder順」のルールはここに集約し、
// 画面側は getBanners() を呼ぶだけにします（将来Firestore化も差し替え1か所）。
// =============================================================

import bannersData from '../data/banners.json';
import type { Banner } from '../types';

// 一覧取得：公開中のみ、sortOrder順（小さいほど先頭）
export function getBanners(): Banner[] {
  const banners = bannersData as Banner[];
  return banners
    .filter((banner) => banner.isPublished)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}