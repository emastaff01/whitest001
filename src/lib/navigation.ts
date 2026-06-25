// =============================================================
// src/lib/navigation.ts
// -------------------------------------------------------------
// サイトのナビゲーション（メニュー）の項目を1か所にまとめた設定です。
// ヘッダー・フッター・モバイルのドロワーメニューが、すべて
// このファイルを参照します。メニューを増減したい時はここだけ直せば、
// 全部に反映されます（管理が楽・修正漏れが起きにくい）。
// =============================================================

export interface NavLink {
  label: string; // 日本語ラベル
  labelEn?: string; // 英字ラベル（任意・装飾用）
  path: string; // url() に渡すパス（/test-whi は自動で付く）
}

export interface NavGroup {
  title: string; // グループ見出し（フッターのカラム見出し等）
  links: NavLink[];
}

// ヘッダー上部に並べる主要メニュー（PC表示の横並び用・抜粋）
export const headerNav: NavLink[] = [
  { label: 'チャペル', labelEn: 'CHAPEL', path: '/chapel' },
  { label: '披露宴会場', labelEn: 'BANQUET', path: '/banquet' },
  { label: '料理', labelEn: 'CUISINE', path: '/cuisine' },
  { label: 'プラン', labelEn: 'PLAN', path: '/plan' },
  { label: 'フェア', labelEn: 'FAIR', path: '/fair' },
  { label: 'レポート', labelEn: 'REPORT', path: '/report' },
  { label: '当日までの流れ', labelEn: 'SCHEDULE', path: '/schedule' },
];

// 全ページのサイトマップ（フッター・モバイルドロワーの全項目用）
export const navGroups: NavGroup[] = [
  {
    title: '会場について',
    links: [
      { label: 'チャペル', labelEn: 'CHAPEL', path: '/chapel' },
      { label: '披露宴会場', labelEn: 'BANQUET', path: '/banquet' },
      { label: '料理', labelEn: 'CUISINE', path: '/cuisine' },
    ],
  },
  {
    title: 'ウェディング',
    links: [
      { label: 'プラン', labelEn: 'PLAN', path: '/plan' },
      { label: 'ブライダルフェア', labelEn: 'FAIR', path: '/fair' },
      { label: 'ウェディングレポート', labelEn: 'REPORT', path: '/report' },
      { label: '当日までの流れ', labelEn: 'SCHEDULE', path: '/schedule' },
    ],
  },
  {
    title: 'インフォメーション',
    links: [
      { label: 'アクセス', labelEn: 'ACCESS', path: '/access' },
      { label: 'よくあるご質問', labelEn: 'FAQ', path: '/faq' },
      { label: 'お知らせ', labelEn: 'NEWS', path: '/news' },
    ],
  },
  {
    title: 'お問い合わせ',
    links: [
      { label: '来館予約・お問い合わせ', path: '/contact' },
    ],
  },
];
