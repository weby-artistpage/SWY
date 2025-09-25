# stick with you — Website

静的なブランドサイトの最小実装です。`index.html` をブラウザで開くだけで表示できます。外部依存はありません（フォント含む）。

## セットアップ / 表示
- Finder（またはエクスプローラ）でこのフォルダを開く
- `index.html` をダブルクリックしてブラウザで開く
- もしくは簡易サーバを使う場合は、ターミナルでプロジェクト直下に移動して次のいずれかを実行
  - Python: `python3 -m http.server 8000`
  - Node (有れば): `npx serve .`

## 構成
- `index.html`: トップページ（Hero / Products / Story / Lookbook / Contact）
- `assets/css/style.css`: スタイル（レスポンシブ、ダーク）
- `assets/js/main.js`: 交互 UI（モバイルナビ、スムーススクロール、スクロール表示）
- `assets/img/*`: プレースホルダ画像、ロゴ、OG 画像、ファビコン

## カスタマイズのポイント
- ロゴ: `assets/img/logo.svg` を差し替え可
- OG 画像: `assets/img/og.svg` をSNS用に編集
- Favicon: `assets/img/favicon.svg`
- 商品: `index.html` の Products セクションの6カードを編集
- 画像: `assets/img/product-*.svg` と `assets/img/look-*.svg` を実写に差し替え
- カラー: `assets/css/style.css` の `:root` で `--accent` などを変更
- お問い合わせ: 実運用では `#contact` のフォームを外部サービスに接続

## アクセシビリティ
- スキップリンク、コントラスト配慮、フォーカスリング、`aria-*`属性を追加済

## ライセンス
-（社内/個人利用想定）必要に応じて追記してください。
