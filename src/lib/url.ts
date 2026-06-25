// =============================================================
// src/lib/url.ts
// -------------------------------------------------------------
// サイト内リンクを作るための小さなヘルパー関数です。

// =============================================================

export function url(path: string = '/'): string {
  // import.meta.env.BASE_URL には astro.config.mjs の base（'/test-whi/'）が入る
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // 末尾スラッシュを除去 → '/test-whi'

  if (path === '/' || path === '') {
    return `${base}/`;
  }

  // 前後のスラッシュを一旦消してから、末尾に / を付けて整える
  // （Astroのディレクトリ形式に合わせ、無駄なリダイレクトを防ぐ）
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${base}/${clean}/`;
}
