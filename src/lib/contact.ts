// =============================================================
// src/lib/contact.ts
// -------------------------------------------------------------
// お問い合わせフォームの送信先（Cloudflare Worker）を1か所にまとめた定数。
// contact / contact-fair / contact-plan の3ページがここを参照する。
// 別式場に移す時は、この1行だけを新しい Worker の URL に書き換える。
// （末尾スラッシュなし。公開URLなので秘密情報ではない）
// =============================================================

export const CONTACT_ENDPOINT = "https://whitehouse-imari-contact-worker.matsufuji.workers.dev";