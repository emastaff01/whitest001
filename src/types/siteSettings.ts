// src/types/siteSettings.ts
// 管理画面v2で扱うサイト設定の型定義。
// Firestoreの siteSettings コレクションの各ドキュメントに対応する。

/** デザイン設定（カラー・フォント・ボタン形状） */
export type DesignSettings = {
  // ブランドカラー（CSS変数 --bronze / --green に対応）
  colorBronze: string;
  colorGreen: string;
  // フォント（CSS変数 --font-jp-serif 等に対応。読み込み済みフォント名を文字列で保持）
  fontJpSerif: string;
  fontJpSans: string;
  fontEnDisplay: string;
  fontEnLabel: string;
  // ボタン形状（square=角あり / rounded=角丸あり / pill=完全角丸）
  buttonShape: 'square' | 'rounded' | 'pill';
};
// --- ナビゲーション設定 ---

/** 1件のリンク設定。isVisible=false で「管理上は残すが非表示」にする */
export interface NavLinkSetting {
label:      string;
labelEn:    string; 
  path:       string;   // 内部リンクは "/chapel" など。外部は "https://..." 形式
  isVisible:  boolean;
  isExternal: boolean;  // true のとき公開側で target="_blank" rel="noopener noreferrer" を付ける
  sortOrder:  number;   // 並び順（0始まり）
}

/** ドロワー・フッター用のグループ */
export interface NavGroupSetting {
  title:     string;
  isVisible: boolean;
  sortOrder: number;
  links:     NavLinkSetting[];
}

/** ナビゲーション設定（Firestore siteSettings/navigation に保存する形） */
export interface NavigationSettings {
  headerNav: NavLinkSetting[];
  navGroups: NavGroupSetting[];
}

/** SEO設定（ページごとのtitle・description・OGP画像） */
export type SeoSettings = {
  pages: {
    [pageId: string]: {
      title:       string;
      description: string;
      ogpImageUrl?: string; // 省略可
      noindex:     boolean;
    };
  };
};

/** SNS URL設定 */
export type SnsSettings = {
  instagram?: string;
  facebook?:  string;
  x?:         string;
  blog?:      string;
};

/** siteSettings コレクションのドキュメントIDの一覧（固定値） */
export type SiteSettingsDocId = 'design' | 'navigation' | 'seo' | 'sns'| 'analytics';

// アクセス解析（GA4）設定。siteSettings/analytics ドキュメントに保存する。
// 既存JSON・Firestoreに無い項目を必須にすると型エラーになるため optional（?）にする（§7）。
export interface AnalyticsSettings {
  // GA4 の測定ID（G-XXXXXXXXXX 形式）。未設定なら空文字を保存する。
  ga4MeasurementId?: string;
};