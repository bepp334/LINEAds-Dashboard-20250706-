const crypto = require('crypto');

class LineAdsApi {
  constructor(accessKey, secretKey, accountId) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.accountId = accountId;
    this.baseUrl = 'https://ads.line.me/api/v3';
  }

  // JWS認証ヘッダーを生成
  generateAuthHeader(canonicalUrl) {
    const headerJson = {
      alg: 'HS256',
      kid: this.accessKey,
      typ: 'text/plain'
    };

    const jws_header = Buffer.from(JSON.stringify(headerJson)).toString('base64url');
    const hexDigest = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    const payloadDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const payload = `${hexDigest}\n\n${payloadDate}\n${canonicalUrl}`;
    const jws_payload = Buffer.from(payload).toString('base64url');

    const stringToSign = `${jws_header}.${jws_payload}`;
    const signature = crypto.createHmac('sha256', this.secretKey)
                           .update(stringToSign)
                           .digest('base64url');

    return `Bearer ${jws_header}.${jws_payload}.${signature}`;
  }

  // 広告データを取得
  async getAdData(since, until) {
    try {
      const canonicalUrl = `/adaccounts/${this.accountId}/reports/online/campaign`;
      const authHeader = this.generateAuthHeader(canonicalUrl);
      
      const url = `${this.baseUrl}${canonicalUrl}?since=${since}&until=${until}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('LINE Ads API Error:', error);
      throw error;
    }
  }

  // 過去7日間のデータを取得
  async getLast7DaysData() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const since = startDate.toISOString().split('T')[0];
    const until = endDate.toISOString().split('T')[0];

    return await this.getAdData(since, until);
  }

  // データを整形してダッシュボード用に変換
  formatDataForDashboard(rawData) {
    if (!rawData || !rawData.data) {
      return {
        summary: {
          impressions: 0,
          clicks: 0,
          spend: 0,
          ctr: 0
        },
        dailyData: []
      };
    }

    const data = rawData.data;
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalSpend = 0;
    const dailyData = [];

    // 日別データを集計
    const dailyMap = new Map();

    data.forEach(item => {
      const date = item.date;
      const impressions = parseInt(item.impressions) || 0;
      const clicks = parseInt(item.clicks) || 0;
      const spend = parseFloat(item.spend) || 0;

      totalImpressions += impressions;
      totalClicks += clicks;
      totalSpend += spend;

      if (dailyMap.has(date)) {
        const existing = dailyMap.get(date);
        dailyMap.set(date, {
          date,
          impressions: existing.impressions + impressions,
          clicks: existing.clicks + clicks,
          spend: existing.spend + spend
        });
      } else {
        dailyMap.set(date, { date, impressions, clicks, spend });
      }
    });

    // 日別データを配列に変換
    dailyMap.forEach((value, key) => {
      dailyData.push({
        ...value,
        ctr: value.impressions > 0 ? (value.clicks / value.impressions * 100).toFixed(2) : 0
      });
    });

    // 日付順にソート
    dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      summary: {
        impressions: totalImpressions,
        clicks: totalClicks,
        spend: totalSpend,
        ctr: totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : 0
      },
      dailyData
    };
  }
}

module.exports = LineAdsApi; 