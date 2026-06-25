// =============================================================
// src/lib/getTaxonomies.ts
// -------------------------------------------------------------
// タグ／カテゴリーのマスター（taxonomies）を取得する関数。
// ・公開中（isPublished が true）のみ返す
// ・sortOrder の昇順（小さいほど先頭）に並べる
// ・group を渡すと、その語彙だけに絞り込める（例: 'news-category'）
//
// なぜ「早見表（Map）」も用意するのか:
//   各レコード（お知らせ等）は、ラベル文字列ではなく id だけを持つ（id参照）。
//   画面に出すときに「id → ラベル」へ変換する必要があるため、
//   id をキーにした早見表（Map）を作っておくと、画面側が一発で引けて簡潔・高速。
// =============================================================

import taxonomiesData from '../data/taxonomies.json';
import type { Taxonomy, TaxonomyGroup } from '../types';

// 一覧取得：公開中のみ・sortOrder 昇順。group を渡すとその語彙だけに絞る。
export function getTaxonomies(group?: TaxonomyGroup): Taxonomy[] {
  const items = taxonomiesData as Taxonomy[];
  return items
    .filter((t) => t.isPublished) // 公開中（有効な選択肢）だけ
    .filter((t) => (group ? t.group === group : true)) // group 指定があれば絞り込み
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)); // 表示順（未設定は 0 扱い）
}

// 早見表：id → Taxonomy の Map を作る。
// 画面側は map.get(id)?.label でラベル、map.get(id)?.icon でアイコンを引ける。
// ※ ループの中で何度もラベルを引くページでは、この Map を1回だけ作って使い回すと速い。
export function getTaxonomyMap(group?: TaxonomyGroup): Map<string, Taxonomy> {
  return new Map(getTaxonomies(group).map((t) => [t.id, t]));
}

// ラベルだけ手早く引きたいとき用のショートカット。
// 未知の id（引退・削除済みなど）は undefined を返す＝表示側で「スキップ」できる（防御）。
export function getTaxonomyLabel(id: string, group?: TaxonomyGroup): string | undefined {
  return getTaxonomyMap(group).get(id)?.label;
}

// 将来：Firestore版（中身だけ差し替え。呼び出し側は直さない）
// import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
// import { db } from './firebase';
// export async function getTaxonomies(group?: TaxonomyGroup): Promise<Taxonomy[]> {
//   const base = query(collection(db, 'taxonomies'), where('isPublished', '==', true), orderBy('sortOrder', 'asc'));
//   const snapshot = await getDocs(base);
//   const all = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Taxonomy, 'id'>) }));
//   return group ? all.filter((t) => t.group === group) : all;
// }
