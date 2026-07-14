// =============================================================
// types/index.ts
// -------------------------------------------------------------
// このファイルは「データの形（型）」をまとめて定義する場所です。
//
// なぜ先に型を決めるのか:
//   テスト段階は静的JSON、本番はFirestore（クラウドDB）を使いますが、
//   どちらも「同じ形のデータ」を扱えるよう、先に型を1か所に決めておきます。
//   こうすると、後で JSON → Firestore に切り替えても、
//   呼び出し側のコードを直さずに済みます（差し替えポイントは lib/ だけ）。
//
// 設計資料「8. Firestoreコレクション設計」に対応しています。
// =============================================================

// -------------------------------------------------------------
// 共通: 画像（altは必須にして、SEO/アクセシビリティの抜け漏れを防ぐ）
// -------------------------------------------------------------
export interface SiteImage {
  src: string; // 画像のパス or URL
  alt: string; // 代替テキスト（必須）。空にしない。
  width?: number;
  height?: number;
}

// -------------------------------------------------------------
// タグ／カテゴリーのマスター（コレクション: taxonomies）
// -------------------------------------------------------------
// 各種「選択肢の一覧（マスター）」を1コレクションにまとめ、group で語彙を区別する。
// レコード側（Fair / Plan / Post）は、ここの id を参照して持つ（＝id参照）。
export type TaxonomyGroup =
| 'fair-contents' // フェア「体験できること」（icon あり）
| 'fair-tags' // フェア「タグ」
| 'plan-includes' // プラン「含まれるもの」
| 'plan-tags' // プラン「対象スタイル」（旧 styleIds）
| 'news-category' // お知らせ「カテゴリー」（単一選択）
| 'report-tags'; // レポート「タグ」（複数選択）

export interface Taxonomy {
  id: string; // 一意キー兼参照値（接頭辞で名前空間化。例: 'nc-info'）
  group: TaxonomyGroup; // どの語彙か
  label: string; // 画面表示の日本語（例: 'お知らせ'）
  icon?: string; // アイコンキー（fair-contents のときだけ使う）
  sortOrder?: number; // 表示順（小さいほど先頭）
  isPublished: boolean; // 選択肢として有効か（false で「引退」＝既存参照は残しつつ選択肢から隠す）
}

// -------------------------------------------------------------
// ブライダルフェア（コレクション: fairs / フォーム: /contact-fair）
// -------------------------------------------------------------
export type FairSlotStatus = 'available' | 'few' | 'full'; // ◎空きあり / △残りわずか / ×満席

export interface FairTimeSlot {
  time: string; // 例: '10:00'
  status: FairSlotStatus; // 空き状況。残数（capacity - booked）から自動計算した結果を保存する（公開側はこれを読む）
  capacity?: number; // 定員（組数）。この枠で受け付ける上限。未設定なら管理画面の normalize で既定値を補完
  booked?: number; // 予約済み（組数）。残り = capacity - booked。フェーズ1では手入力、将来フォーム自動カウント
}

export interface FairSchedule {
  date: string; // 'YYYY-MM-DD'
  times: FairTimeSlot[]; // その日の時間枠
}



export interface Fair {
  id: string; // 一意のID（URL /fair/[id] に使う）
  title: string; // フェア名
  catchCopy?: string; // 短いキャッチ
  description: string; // 説明文
  thumbnail: SiteImage; // 一覧表示用サムネイル
  // カテゴリータグ（taxonomies(fair-tags) の id を参照。表示時にラベルへ変換）
  tagIds?: string[];
  // 所要時間の目安（詳細のみ。例: '約2時間30分'）
  duration?: string;
  // フェアで体験できること（taxonomies(fair-contents) の id を参照。表示時にラベル＋アイコンへ変換）
  contentIds?: string[];
  // 開催日程：日付ごとに時間枠と空き状況を持つ
  schedule: FairSchedule[];
  // 来館特典（フェアに参加するともらえる特典）
  benefits?: string[];
  // 成約特典（このフェアで成約した場合の特典）。任意：あるフェアだけ表示される
  contractBenefits?: string[];
  // 予約フォームへ渡す識別用（GA4 fair_id と一致させる）
  reservationFormId?: string;
  isPublished: boolean; // 公開フラグ（下書き保存に対応）
  sortOrder?: number; // 表示順（小さいほど上）
}

// -------------------------------------------------------------
// 結婚式プラン（コレクション: plans / フォーム: /contact-plan）
// -------------------------------------------------------------
export interface Plan {
  id: string;
  title: string;
  description: string;
  thumbnail: SiteImage;
  priceFrom: number; // 総額の最低価格（円）。例: 1920000
  priceTo?: number; // 総額の上限（円）。例: 3000000
  guestCountBase?: number; // 価格の基準人数。例: 100
  // プランに含まれるもの（taxonomies(plan-includes) の id を参照。表示時にラベルへ変換）
  includeIds?: string[];
  // 対象となるウェディングスタイル（将来 plan-tags へ移行予定）
  tagIds?: string[];
  isPublished: boolean;
  sortOrder?: number;
}

// -------------------------------------------------------------
// ウェディングレポート（コレクション: reports / 旧:卒花レポート）
// クライアントが後からCMSで追加していく想定
// -------------------------------------------------------------
export interface Report {
  id: string;
  title: string;
  // カップル名（イニシャル等。個人情報の出し方はクライアント確認）
  coupleName?: string;
  weddingDate?: string; // 挙式日 'YYYY-MM-DD'
  guestCount?: number; // 招待人数
  body: string; // 本文
  thumbnail: SiteImage; // 一覧表示用
  gallery?: SiteImage[]; // 詳細ページ用の複数画像
  // レポートのタグ（taxonomies(report-tags) の id を参照。表示時にラベルへ変換）
  tagIds?: string[];
  isPublished: boolean;
  publishedAt?: string; // 公開日 'YYYY-MM-DD'
  sortOrder?: number;
}

// -------------------------------------------------------------
// ウェディングスタイル（コレクション: styles / 初期2件・将来拡張）
// -------------------------------------------------------------
export interface Style {
  id: string; // 例: 'private' / 'small'
  title: string; // 例: '1棟貸切ウェディング'
  description: string;
  thumbnail: SiteImage;
  isPublished: boolean;
  sortOrder?: number;
}

// -------------------------------------------------------------
// お知らせ（コレクション: posts）
// -------------------------------------------------------------
export interface Post {
  id: string;
  title: string;
  body: string;
  categoryId?: string; // taxonomies(news-category) の id を参照。表示時にラベルへ変換する。
  publishedAt: string; // 'YYYY-MM-DD'（読者に見える公開日。構造化データにも使う）
  isPublished: boolean;
  thumbnail?: SiteImage;
  sortOrder?: number;      // 表示順（小さいほど先頭）。管理画面のドラッグ並べ替えで採番する
  publishStartAt?: string; // 予約投稿：公開を開始する日時 'YYYY-MM-DDTHH:mm'。空＝即時（isPublished に従う）
  publishEndAt?: string;   // 予約非公開：公開を終了する日時（同形式）。空＝自動非公開しない
}

// -------------------------------------------------------------
// よくある質問（コレクション: faqs）
// -------------------------------------------------------------
export interface Faq {
  id: string;
  question: string; // 質問文（短く）
  answer: string; // 回答文。<br /> など簡易HTML可（set:htmlで描画）
  category?: string; // 例: 'フェア' / '料金' / '当日' / 'その他'
  isPublished: boolean;
  sortOrder?: number;
}
// -------------------------------------------------------------
// バナー（コレクション: banners / TOPのバナースライダー）
// -------------------------------------------------------------
export interface Banner {
  id: string;
  image: SiteImage; // 横長バナー画像（src は .jpg。同名の .webp も用意する）
  href: string; // クリック時の遷移先。当面は '#'。サイト内リンクにする際は url() を通す
  isPublished: boolean;
  sortOrder?: number; // 表示順（小さいほど先頭）
}

// -------------------------------------------------------------
// サイト共通設定（コレクション: site_settings / ドキュメント: main）
// -------------------------------------------------------------
// サイト共通設定（コレクション: site_settings / ドキュメント: main）
// NAP情報（名称・住所・電話）など、全ページで共有する情報
// -------------------------------------------------------------
export interface SiteSettings {
  siteName: string; // ホワイトハウス伊万里
  // 発行元ロゴ（構造化データの publisher.logo や組織情報で使用）。
  // public 配下のパスを入れる。例: '/images/logo-placeholder.png'。任意（無ければロゴを出さない）。
  logo?: string;
  // NAP情報（MEO対策で全ページ統一表記する）
  nap: {
    name: string; // ホワイトハウス伊万里
    postalCode: string; // 848-0041
    address: string; // 佐賀県伊万里市新天町520-6（表示用の結合住所。アクセスページ等が参照）
    phone: string; // 0955-22-2021
    // ↓ 構造化データ（JSON-LD）用の分割住所・緯度経度。表示用の address とは別役割
    addressRegion: string; // 都道府県。例: '佐賀県'
    addressLocality: string; // 市区町村。例: '伊万里市'
    streetAddress: string; // 番地以降。例: '新天町520-6'
    latitude: string; // 緯度。例: '33.275'（文字列で保持）
    longitude: string; // 経度。例: '129.880'（文字列で保持）
  };
  businessHours: string; // 例: '10:00 - 20:00'
  closedDays: string; // 例: '毎週火曜日・水曜日（祝日除く）'
  access: string; // 例: 'JR伊万里駅徒歩10分'
  parking?: string; // 例: '敷地内駐車場20台あり'
  // 外部リンク（後日提供されるものは空でOK）
  lineUrl?: string;
  instagramUrl?: string;
  // 連携サイト
  partnerLinks?: { label: string; url: string }[];
  // リブランドOPEN情報（複数ページで参照するため設定にまとめる）
  renewalOpen?: {
    displayYearMonth: string; // 大きく見せる英数字表記。例: '2026.06'
    displayText: string; // 文中で使う日本語表記。例: '2026年6月'
  };
}

// =============================================================
// 以下は「送信データ」の型（フォーム実装はセッション14・本番は後フェーズ）。
// 先に形を決めておくことで、後のフォーム実装がスムーズになります。
// =============================================================

// フォーム共通の連絡先情報
export interface CustomerInfo {
  name: string;
  furigana?: string;
  email: string;
  tel: string;
}

// /contact-fair → fair_reservations
export interface FairReservation extends CustomerInfo {
  fairId: string;
  preferredDate: string;
  message?: string;
}

// /contact-plan → plan_inquiries
export interface PlanInquiry extends CustomerInfo {
  planId?: string;
  expectedGuests?: number;
  preferredSeason?: string;
  budget?: string;
  message?: string;
}

// /contact → contact_requests（汎用）
export type ContactType =
  | 'visit_reservation' // 来館予約
  | 'brochure_request' // 資料請求
  | 'general_inquiry' // 一般質問
  | 'other'; // その他

export interface ContactRequest extends CustomerInfo {
  contactType: ContactType;
  message: string;
}