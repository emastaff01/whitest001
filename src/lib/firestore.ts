// src/lib/firestore.ts
// 管理画面（ブラウザ側）が Firestore を読み書きするための関数。
// 各パネルの保存・読み込みは、この関数群（save〜ToDb / get〜FromDb）を通して行う。
// ※公開サイトのビルド時読み込み（案A・Admin SDK）とは別物。ここはクライアントSDK。

import { getDocs, collection, setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Fair, Plan, Post, Report, Taxonomy } from '../types';
import type { DesignSettings, NavigationSettings, SeoSettings, SnsSettings } from '../types/siteSettings';

function stripUndefined<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

// -------------------------------------------------------------
// 読み出し：fairs コレクションを全件取得して Fair[] にする。
// 各ドキュメントは「ラベル(doc.id)＝id／中身(data())＝id以外」なので、
// 読むときに id を復元して元のJSONと同じ形に組み立て直す（図と同じ合体）。
// -------------------------------------------------------------
export const getFairsFromDb = async (): Promise<Fair[]> => {
  const snap = await getDocs(collection(db, 'fairs'));
  // d.data() は「id を含まない中身」。Omit<Fair,'id'> として扱い、id を付け直す。
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Fair, 'id'>) }));
};

// -------------------------------------------------------------
// 書き込み：フェアを1件保存（作成 or 上書き）。
// id は「中身」から抜いてラベル(doc.id)に格上げする＝正本を1か所にする設計。
// setDoc は「指定IDのドキュメントを丸ごと作成/上書き」する命令。
// -------------------------------------------------------------
export async function saveFairToDb(fair: Fair): Promise<void> {
  const { id, ...body } = fair;
  await setDoc(doc(db, 'fairs', id), stripUndefined(body));
}

/** フェア1件を削除（ドキュメントごと消す）。id＝ドキュメントID（ラベル）を指定 */
export async function deleteFairFromDb(id: string): Promise<void> {
  await deleteDoc(doc(db, 'fairs', id));
}

// ---- プラン（plans）----

/** プラン全件を読み出す。doc.id を id に復元して元の型の形に戻す */
export async function getPlansFromDb(): Promise<Plan[]> {
  const snap = await getDocs(collection(db, 'plans'));
  // d.data() は id を含まない「中身」。d.id（ラベル）を id として復元する
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Plan, 'id'>) }));
}

/** プラン1件を保存（新規作成 / 上書き）。id は中身から抜き、ラベル（doc.id）に格上げ */
export async function savePlanToDb(plan: Plan): Promise<void> {
  const { id, ...body } = plan; // id を分離（body には id が含まれない）
  await setDoc(doc(db, 'plans', id), stripUndefined(body));
}
/** プラン1件を削除（ドキュメントごと消す）。id＝ドキュメントID（ラベル）を指定 */
export async function deletePlanFromDb(id: string): Promise<void> {
  await deleteDoc(doc(db, 'plans', id));
}

// ---- お知らせ（posts）----

/** お知らせ全件を読み出す */
export async function getPostsFromDb(): Promise<Post[]> {
  const snap = await getDocs(collection(db, 'posts'));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Post, 'id'>) }));
}

/** お知らせ1件を保存 */
export async function savePostToDb(post: Post): Promise<void> {
  const { id, ...body } = post;
  await setDoc(doc(db, 'posts', id), stripUndefined(body));
}

/** お知らせ1件を削除（ドキュメントごと消す）。id＝ドキュメントID（ラベル）を指定 */
export async function deletePostFromDb(id: string): Promise<void> {
  await deleteDoc(doc(db, 'posts', id));
}

// ---- レポート（reports）----

/** レポート全件を読み出す */
export async function getReportsFromDb(): Promise<Report[]> {
  const snap = await getDocs(collection(db, 'reports'));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Report, 'id'>) }));
}

/** レポート1件を保存 */
export async function saveReportToDb(report: Report): Promise<void> {
  const { id, ...body } = report;
  await setDoc(doc(db, 'reports', id), stripUndefined(body));
}

/** レポート1件を削除。id＝ドキュメントID（ラベル）を指定 */
export async function deleteReportFromDb(id: string): Promise<void> {
  // doc(db, コレクション名, ドキュメントID) で「reports の中の、このidのドキュメント」を指す
  // deleteDoc でその1件だけを削除する（他のフィールド指定は不要）
  await deleteDoc(doc(db, 'reports', id));
  }
  
// ---- タグ／カテゴリー（taxonomies）----
  
  // 全件を読み出す。1コレクションに全 group（news-category 等）が同居するので、
  // ここでは group で絞らず「全部」返す。語彙ごとの絞り込みはパネル側でおこなう。
  export async function getTaxonomiesFromDb(): Promise<Taxonomy[]> {
    const snap = await getDocs(collection(db, 'taxonomies'));
    // d.data() は id を含まない「中身」。d.id（ラベル）を id として復元する
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Taxonomy, 'id'>) }));
  }
  
  // 1件を保存（新規作成 / 上書き）。id は中身から抜き、ラベル（doc.id）に格上げ
  export async function saveTaxonomyToDb(taxonomy: Taxonomy): Promise<void> {
    const { id, ...body } = taxonomy; // id を分離（body には id が含まれない）
    await setDoc(doc(db, 'taxonomies', id), stripUndefined(body));
  }
  
  // 1件を削除（ドキュメントごと消す）。id＝ドキュメントID（ラベル）を指定
  export async function deleteTaxonomyFromDb(id: string): Promise<void> {
    await deleteDoc(doc(db, 'taxonomies', id));
  }
  
  
  
  
 // --- siteSettings（サイト設定）---

 /**
  * siteSettings コレクションから指定ドキュメントを取得する汎用関数。
  * ドキュメントが存在しない場合は null を返す。
  */
 async function getSiteSettingDoc<T>(docId: string): Promise<T | null> {
   const ref = doc(db, "siteSettings", docId);
   const snap = await getDoc(ref);
   if (!snap.exists()) return null;
   return snap.data() as T;
 }
 
 /**
  * siteSettings コレクションの指定ドキュメントを上書き保存する汎用関数。
  * stripUndefined で undefined フィールドを除去してから書き込む（§7）。
  */
 async function saveSiteSettingDoc<T extends object>(
   docId: string,
   data: T
 ): Promise<void> {
   const ref = doc(db, "siteSettings", docId);
   await setDoc(ref, stripUndefined(data));
 }
 
 // 各ドキュメントごとの個別関数（型を確定させるためのラッパー）
 
 export const getDesignSettings = () =>
   getSiteSettingDoc<DesignSettings>("design");
 
 export const getNavigationSettings = () =>
   getSiteSettingDoc<NavigationSettings>("navigation");
 
 export const getSeoSettings = () =>
   getSiteSettingDoc<SeoSettings>("seo");
 
 export const getSnsSettings = () =>
   getSiteSettingDoc<SnsSettings>("sns");
 
 export const saveDesignSettings = (data: DesignSettings) =>
   saveSiteSettingDoc("design", data);
 
 export const saveNavigationSettings = (data: NavigationSettings) =>
   saveSiteSettingDoc("navigation", data);
 
 export const saveSeoSettings = (data: SeoSettings) =>
   saveSiteSettingDoc("seo", data);
 
 export const saveSnsSettings = (data: SnsSettings) =>
   saveSiteSettingDoc("sns", data);
   
