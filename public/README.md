# ホワイトハウス伊万里 テストサイト

メモリードグループ「ホワイトハウス伊万里」リニューアルのテストサイトです。
Astro（静的サイト）で構築し、Cloud Run サービス `ema-run` のサブディレクトリ
`/test-whi/` に配置します。

- テストサイトURL（確定）: https://ema-run-665477084949.asia-northeast1.run.app/test-whi/
- 段階: テストサイト制作（デザイン・動きを見せることが最優先）
- 検索エンジンには出さない設定（noindex / robots.txt）

---

## ローカルでの動かし方（Mac）

ターミナル（または Nova のターミナル）で、このフォルダに移動してから実行します。

```bash
# 1回目だけ：必要なライブラリをインストール
npm install

# 開発サーバーを起動（毎回これで作業）
npm run dev
```

起動したら、ブラウザで次を開きます（base 設定により /test-whi/ が付きます）。

```
http://localhost:4321/test-whi/
```

- 終了するときは、ターミナルで `Ctrl + C`
- 公開用ファイルを作るには `npm run build`（`dist/` に出力されます）
- 型のチェックは `npm run check`

---

## フォルダ構成のポイント

```
src/
├── data/      仮データ（静的JSON）。後でFirestoreへ移行する想定
├── lib/       データ取得関数。ここの「中身」だけ差し替えればFirestore対応になる
├── types/     データの型定義（Firestore構造を先に決めておく場所）
├── layouts/   全ページ共通の土台（BaseLayout.astro）
├── components/ 部品（セッション2以降で作成）
├── pages/     各ページ。admin/ はCMS用に予約（今は「準備中」）
└── styles/    variables.css（カラー・トークン）/ global.css（ベース）

public/        そのまま配信される静的ファイル（robots.txt / llms.txt / 画像 等）
rules/         Firestoreのルール・インデックス（本番フェーズ用の予約）
seed/          初期データ投入スクリプト（本番フェーズ用の予約）
```

### 「JSON → Firestore 差し替え」の考え方

画面側は `getFairs()` などの関数を呼ぶだけです。
今はその関数がJSONを返しますが、本番では関数の中身をFirestore版に
書き換えるだけで、画面側のコードは一切変えずに済みます。

---

## デプロイ（重要な注意あり）

`ema-run` は「1つのCloud Runサービスに複数サイトを同居」させる運用で、
既に `/invition-archive/` が動いています。

**Dockerfile / cloudbuild.yaml は参考版です。** デプロイ前に必ず
`invition-archive` の同名ファイルを確認し、構成を合わせてください。
方式を間違えると既存サイトに影響する恐れがあります（詳細はチャットの説明参照）。

---

## このセッション（1・2）で済んでいること

セッション1（初期設定）:
- Astroプロジェクトの初期化（base:/test-whi の設定）
- カラー（7変数＋補助）・フォント4種の読み込み
- BaseLayout（SEO/MEO/LLMOメタタグ・構造化データ・noindex・GA4枠）
- 仮データ・データ取得関数・型定義・admin予約ページ
- robots.txt / llms.txt

セッション2（共通コンポーネント）:
- Header（固定ヘッダー・PCナビ・モバイルドロワー・電話タップ計測）
- Footer（NAP構造化・サイトマップ・提携リンク・LINE枠）
- CtaButton（4種のボタン variant）/ CtaSection（最終CTA・3フォーム分岐）
- URLヘルパー・ナビ設定・GA4クリック計測（lineCV/phoneCV）の仕組み

セッション3（ファーストビュー）:
- Hero（静止画クロスフェードスライダー・自動再生6秒・矢印/ドット/スワイプ・reduced-motion対応）
- クライアント提供写真5枚をWebP最適化（public/images/hero/）
- TOPページにHeroを実装

セッション4（リード〜RENEWAL OPEN）:
- LeadIntro（Hero直下の明朝リード文）
- ConceptSection（USP・1棟1組完全貸切・ガラス張りチャペル等を伝える）
- RenewalOpenSection（2026.06 リブランドOPEN告知＋ブライダルフェアCTA）
- site-settings.json に renewalOpen 情報を追加

セッション5（邸宅の3本柱）:
- ChapelSection（写真左・テキスト右、白背景）
- BanquetSection（テキスト左・写真右、オフホワイト背景）
- StyleSection（PRIVATE / SMALL を2カード並列）
- 各セクションに /chapel/ /banquet/ /style/private/ /style/small/ への導線
- ※その後の方針変更で /style（スタイル詳細）と StyleSection は廃止。対象スタイルはプラン詳細のタグ表示に統合済み。

セッション6（料理・プラン）:
- CuisineSection（料理写真未提供のため、テキスト主体の静謐な構成・オフホワイト背景）
- PlanSection（plans.jsonから3プランを3カードグリッド・カード全体がクリック可能）
- public/images/plans/sample-plan-01〜03.{jpg,webp} を仮サムネとして生成

セッション7（フェア・レポート）:
- FairSection（fairs.jsonから2フェアを2カード・日付はCormorant Garamondで強調）
- ReportSection（reports.jsonから卒花レポートをauto-fitグリッドで・データ件数に応じてカラム数自動調整）
- public/images/fairs/ と public/images/reports/ に仮サムネを生成

セッション8（TOPページ完成）:
- AccessSection（NAP情報＋Googleマップ埋め込み・MEO対応の<dl>構造化）
- FaqSection（<details>/<summary>ネイティブアコーディオン・JSなし）
- NewsSection（最新4件・publishedAt降順・空状態の処理あり）
- 新規型 Faq / 駐車場フィールド追加（SiteSettings.parking）
- 新規データ: faqs.json / posts.json
- 新規lib: getFaqs.ts / getPosts.ts

**TOPページが15セクションで完成しました。**

セッション9（フェア一覧・詳細）:
- PageHeader（下層ページ共通の小さなヘッダーコンポーネント）
- FairCard（TOPと一覧で使い回せるカードに切り出し）
- FairSection をリファクタ（FairCardベースに変更）
- /fair/index.astro（フェア一覧ページ・空状態の処理あり）
- /fair/[id].astro（動的ルート・getStaticPathsで全フェアIDから静的生成）
- Schema.org Event の JSON-LD を各日程ごとに出力（SEO/MEO対応）
- 予約URLに fair_id クエリを付与（フォーム実装時にそのまま使える）

## 次のセッション（10）の予定

- 残る下層ページ群（プラン一覧・詳細／レポート一覧・詳細／固定ページ群 など）
