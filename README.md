# LINE Ads ダッシュボード

LINE Ads APIを使用してリアルタイムで広告データを取得・表示するダッシュボードアプリです。

## 🚀 機能

- **リアルタイムデータ取得**: LINE Ads APIから最新の広告データを取得
- **KPI表示**: インプレッション、クリック、広告費、CTRの主要指標を表示
- **グラフ表示**: 日別推移を折れ線グラフと棒グラフで可視化
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **簡単設定**: ブラウザ上でAPIキーを設定可能

## 📊 表示データ

- インプレッション数
- クリック数
- 広告費
- CTR（クリック率）
- 過去7日間の日別推移

## 🛠️ 技術スタック

- **フロントエンド**: React (Next.js)
- **バックエンド**: Vercel Functions (Next.js API Routes)
- **グラフ**: Recharts
- **スタイリング**: Tailwind CSS
- **認証**: LINE Ads API JWS認証

## 📦 セットアップ

### 1. リポジトリのクローン

```bash
git clone <your-repository-url>
cd line-ads-dashboard
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🔧 LINE Ads API設定

### 1. LINE Ads ManagerでAPIキーを取得

1. [LINE Ads Manager](https://ads.line.me/) にログイン
2. 設定 → API設定に移動
3. Access KeyとSecret Keyを取得
4. アカウントID（A12345678形式）を確認

### 2. アプリでの設定

1. アプリを開く
2. 「設定を開始」ボタンをクリック
3. 以下の情報を入力：
   - Access Key
   - Secret Key
   - Account ID
4. 「保存」ボタンをクリック

## 🚀 Vercelデプロイ

### 1. GitHubにプッシュ

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercelでデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 「New Project」をクリック
3. GitHubリポジトリを選択
4. デプロイ設定を確認して「Deploy」

### 3. 環境変数の設定（本番環境）

Vercelのプロジェクト設定で以下の環境変数を設定：

```
LINE_ADS_ACCESS_KEY=your_access_key
LINE_ADS_SECRET_KEY=your_secret_key
LINE_ADS_ACCOUNT_ID=your_account_id
```

## 📁 プロジェクト構造

```
line-ads-dashboard/
├── pages/
│   ├── index.js              # メインページ
│   └── api/
│       └── line-ads-data.js  # API Route
├── components/
│   ├── Dashboard.js          # メインダッシュボード
│   ├── KPICard.js           # KPI表示カード
│   ├── Chart.js             # グラフコンポーネント
│   └── ConfigPanel.js       # 設定パネル
├── lib/
│   └── lineAdsApi.js        # LINE Ads API認証・データ取得
├── styles/
│   └── globals.css          # グローバルスタイル
├── package.json
├── next.config.js
├── tailwind.config.js
├── vercel.json
└── README.md
```

## 🔐 セキュリティ

- APIキーとシークレットキーはブラウザのローカルストレージに保存
- フロントエンドでAPIキーを直接使用せず、バックエンドで認証処理
- 適切なエラーハンドリングとCORS設定

## 🐛 トラブルシューティング

### よくある問題

1. **認証エラー（401）**
   - APIキーとシークレットキーが正しいか確認
   - LINE Ads ManagerでAPI設定が有効になっているか確認

2. **アクセス権限エラー（403）**
   - アカウントIDが正しいか確認
   - 該当アカウントへのアクセス権限があるか確認

3. **データが表示されない**
   - 指定期間に広告データがあるか確認
   - アカウントにキャンペーンが存在するか確認

4. **レート制限エラー（429）**
   - しばらく待ってから再試行
   - APIリクエスト頻度を確認

### ログの確認

開発者ツールのコンソールでエラーメッセージを確認できます。

## 📝 ライセンス

MIT License

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します。

## 📞 サポート

問題が発生した場合は、GitHubのイシューで報告してください。 