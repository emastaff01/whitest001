// =============================================================
// watch-webp.mjs
//   public/images/ 配下の jpg から、同じ名前の webp を自動生成する。
//
//   2つのモードがある。
//   ・監視モード（引数なし）：起動している間、jpg の追加・上書き・削除を見張る。
//       npm run watch:img  で起動し、ターミナルを開きっぱなしにして使う。停止は Ctrl + C。
//   ・一括モード（--once 付き）：既存の jpg を一度だけまとめて変換して終了する。
//       build の直前に走らせて「webp の取りこぼし」をなくすためのもの。
//
//   どちらのモードでも、webp が無い or jpg より古いものだけ変換する（無駄な作り直しをしない）。
// =============================================================

import chokidar from 'chokidar'; // ファイルの追加・変更・削除を監視するライブラリ
import sharp from 'sharp';       // 画像を読み書き・変換するライブラリ（Astro も内部で使用）
import fs from 'node:fs';        // ファイルの有無確認・削除など（Node 標準）
import path from 'node:path';    // フォルダのパスを安全に組み立てる（Node 標準）

// 監視・変換の対象フォルダ（プロジェクトルートからの相対パス）。
// この下のサブフォルダ（banners / news / chapel など）もまとめて対象にする。
const WATCH_DIR = 'public/images';

// webp の画質（0〜100）。数字が大きいほど高画質・大きいファイル。写真は 80 前後が定番。
const WEBP_QUALITY = 80;

// 起動時の引数に --once が含まれていたら「一括変換して終了」モードにする。
// 例： node scripts/watch-webp.mjs --once
const ONCE = process.argv.includes('--once');

// パスが jpg か判定する（.jpg / .jpeg、大文字小文字どちらもOK）。
const isJpg = (p) => /\.jpe?g$/i.test(p);

// jpg のパスから、対応する webp のパスを作る（拡張子だけ差し替え）。
const toWebpPath = (jpgPath) => jpgPath.replace(/\.jpe?g$/i, '.webp');

// jpg を webp に変換する本体。
async function convert(jpgPath) {
  const webpPath = toWebpPath(jpgPath);

  // すでに webp があり、jpg より新しい（＝変換済み）ならスキップ。
  // これで既存ペアを無駄に作り直さない。
  if (fs.existsSync(webpPath)) {
    const jpgTime = fs.statSync(jpgPath).mtimeMs;   // jpg の最終更新時刻
    const webpTime = fs.statSync(webpPath).mtimeMs; // webp の最終更新時刻
    if (webpTime >= jpgTime) return;
  }

  try {
    // 解像度はそのまま、形式だけ webp にする（Squoosh で手作業していたのと同じ役割）。
    await sharp(jpgPath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    console.log('[webp] 変換:', jpgPath, '→', webpPath);
  } catch (e) {
    // 変換に失敗しても全体は止めない。原因（壊れた画像など）はログで知らせる。
    console.error('[webp] 変換失敗:', jpgPath, '/', e.message);
  }
}

// 対応する webp を消す（jpg が消されたとき用・監視モードでのみ使う）。
function removeWebp(jpgPath) {
  const webpPath = toWebpPath(jpgPath);
  if (fs.existsSync(webpPath)) {
    fs.unlinkSync(webpPath);
    console.log('[webp] 削除:', webpPath);
  }
}

// フォルダを再帰的にたどって jpg を全部集める（一括モード用）。
function collectJpgs(dir) {
  const result = [];
  // withFileTypes: true にすると、各エントリがファイルかフォルダか判定できる。
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...collectJpgs(full)); // サブフォルダの中も掘る
    } else if (isJpg(full)) {
      result.push(full);
    }
  }
  return result;
}

// 一括モード：既存 jpg をまとめて変換して終了する（build 前の取りこぼし防止）。
async function runOnce() {
  if (!fs.existsSync(WATCH_DIR)) {
    console.log('[webp] 対象フォルダが無いのでスキップ:', WATCH_DIR);
    return;
  }
  const jpgs = collectJpgs(WATCH_DIR);
  console.log('[webp] 一括変換を開始（対象 jpg:', jpgs.length, '件）');
  for (const jpg of jpgs) {
    await convert(jpg); // 1枚ずつ順番に変換（webp が揃っていればスキップ）
  }
  console.log('[webp] 一括変換が完了しました。');
}

// 監視モード：起動している間、jpg の増減を見張る。
function runWatch() {
  // ignoreInitial: false … 起動時に既存ファイルも一度走査して webp の抜けを埋める。
  const watcher = chokidar.watch(WATCH_DIR, { ignoreInitial: false });

  watcher
    .on('add', (p) => { if (isJpg(p)) convert(p); })        // 追加・起動時の既存ファイル
    .on('change', (p) => { if (isJpg(p)) convert(p); })     // 上書き
    .on('unlink', (p) => { if (isJpg(p)) removeWebp(p); })  // 削除（webp も連動で消す）
    .on('ready', () => {
      console.log('[webp] 監視を開始しました:', WATCH_DIR);
      console.log('[webp] jpg を置くと自動で webp ができます。停止は Ctrl + C。');
    });
}

// モードに応じて実行を振り分ける。
if (ONCE) {
  runOnce();   // build 前などに1回だけ
} else {
  runWatch();  // 普段の開発中に起動しっぱなし
}
