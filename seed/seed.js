// =============================================================
// seed/seed.js （暫定・本番フェーズ用の初期データ投入スクリプト）
// -------------------------------------------------------------
// 【重要】テストサイト段階では実行しません（予約・たたき台です）。
//
// 目的:
//   本番化フェーズで Firebase 権限が入った後、src/data/*.json の
//   仮データを Firestore に一括投入するためのスクリプトです。
//   実行すると、テスト用のサンプルデータがDBに入ります。
//
// 実行に必要なもの（本番フェーズで用意）:
//   - firebase-admin パッケージ（npm install firebase-admin）
//   - サービスアカウントキー（serviceAccountKey.json）
//     ※鍵は秘密情報。絶対にGitにコミットしない。
//
// 実行方法（本番フェーズで使う想定。今は実行不要）:
//   node seed/seed.js
// =============================================================

/*
import { readFile } from 'node:fs/promises';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// サービスアカウントキーで管理者として接続
const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// JSONを読み込むヘルパー
async function loadJson(relativePath) {
  const url = new URL(relativePath, import.meta.url);
  return JSON.parse(await readFile(url, 'utf-8'));
}

// 配列データを指定コレクションに、ドキュメントの id をキーにして投入
async function seedCollection(collectionName, items) {
  for (const item of items) {
    await db.collection(collectionName).doc(item.id).set(item);
    console.log(`  - ${collectionName}/${item.id} を投入しました`);
  }
}

async function main() {
  console.log('Firestore への初期データ投入を開始します...');

  // 単一ドキュメント（site_settings/main）
  const settings = await loadJson('../src/data/site-settings.json');
  await db.collection('site_settings').doc('main').set(settings);
  console.log('  - site_settings/main を投入しました');

  // 配列データ
  await seedCollection('fairs', await loadJson('../src/data/fairs.json'));
  await seedCollection('plans', await loadJson('../src/data/plans.json'));
  await seedCollection('reports', await loadJson('../src/data/reports.json'));

  console.log('完了しました。');
}

main().catch((err) => {
  console.error('投入中にエラーが発生しました:', err);
  process.exit(1);
});
*/

// 本番フェーズになるまでは、上のコードはコメントアウトしたままにしておきます。
console.log(
  'このスクリプトはテスト段階では実行しません。本番フェーズで有効化します。'
);
