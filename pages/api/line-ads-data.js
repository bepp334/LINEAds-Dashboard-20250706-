import LineAdsApi from '../../lib/lineAdsApi';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { accessKey, secretKey, accountId } = req.body;

    // バリデーション
    if (!accessKey || !secretKey || !accountId) {
      return res.status(400).json({ 
        error: 'Missing required parameters: accessKey, secretKey, accountId' 
      });
    }

    // LINE Ads APIインスタンスを作成
    const lineAdsApi = new LineAdsApi(accessKey, secretKey, accountId);

    // 過去7日間のデータを取得
    const rawData = await lineAdsApi.getLast7DaysData();
    
    // データを整形
    const formattedData = lineAdsApi.formatDataForDashboard(rawData);

    res.status(200).json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // エラーメッセージを適切に処理
    let errorMessage = 'データの取得に失敗しました';
    let statusCode = 500;

    if (error.message.includes('401')) {
      errorMessage = '認証に失敗しました。APIキーとシークレットキーを確認してください。';
      statusCode = 401;
    } else if (error.message.includes('403')) {
      errorMessage = 'アクセス権限がありません。アカウントIDを確認してください。';
      statusCode = 403;
    } else if (error.message.includes('404')) {
      errorMessage = '指定されたアカウントが見つかりません。';
      statusCode = 404;
    } else if (error.message.includes('429')) {
      errorMessage = 'リクエスト制限に達しました。しばらく待ってから再試行してください。';
      statusCode = 429;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 