// src/lib/firebase.ts
// Firebase クライアントSDK（ブラウザ側）の初期化「玄関」。
// ここで初期化したものを管理画面（Auth・Firestore）から import して使う。

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// .env の値を読み込む。PUBLIC_ 付きなのでブラウザ側でも参照できる。
// ※今は空文字のまま。コンソールの値を入れるまで実際の通信はできない（＝雛形）。
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// 二重初期化を防ぐ。
// initializeApp を2回呼ぶとエラー（already exists）になるため、
// 既に初期化済みなら getApp() で既存のものを使い回す。
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 各機能の入口を作って、他ファイルから使えるように export する。
export const auth = getAuth(app); // ログイン（Firebase Auth）用
export const db = getFirestore(app); // Firestore 読み書き用
export default app;