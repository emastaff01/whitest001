// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite'; // .env を読むための関数（astro.config 用）

// astro.config はビルドの前段で動くため、アプリ本体の import.meta.env では
// .env を拾えないことがある。vite の loadEnv を使うのが定石。
// 第1引数=モード(dev/build を自動判別)、第2引数=.env のある場所(プロジェクト直下)、
// 第3引数='' は「PUBLIC_ などの接頭辞で絞らず全部読む」指定。
const env = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');

// サイトの origin（ホスト）。.env の PUBLIC_SITE_URL を優先、無ければテストURL。
const SITE = env.PUBLIC_SITE_URL || 'https://ema-run-665477084949.asia-northeast1.run.app';
// base（サブディレクトリ）。.env の PUBLIC_BASE_PATH を優先、無ければ /test-whi。
const BASE = env.PUBLIC_BASE_PATH || '/test-whi';

export default defineConfig({
  // site: このサイトが最終的に公開される「土台のURL」。
  // 末尾にスラッシュは付けない（Astro公式の推奨）。
  // sitemap や OGP の絶対URL生成に使われます。
  // site/base を .env から受け取る形にした（テストと本番でコードはそのまま、値だけ切替）
  site: SITE,

  // base: サイトを配置するサブディレクトリのパス。
  // これにより、Astro が生成するリンクや asset のパスの先頭に
  // 自動で /test-whi が付与されます。
  // 開発サーバーも http://localhost:4321/test-whi/ で表示されるようになります。
  base: BASE,

  // outDir: ビルド結果（公開用ファイル）の出力先フォルダ。
  outDir: './dist',

  build: {
    // format: 'directory' にすると /concept/index.html のような形になり、
    // URL末尾に .html を付けず /concept/ でアクセスできます（きれいなURL）。
    format: 'directory',
  },
});
