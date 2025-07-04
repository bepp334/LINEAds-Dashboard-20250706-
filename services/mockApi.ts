import { CampaignData, DailyPerformance } from '../types';

// LINE広告APIのエンドポイント例（実際のエンドポイントに合わせて修正してください）
const BASE_URL = 'https://api.line.biz/ad/v2';
const API_KEY = 'uRouDumMQr6TynpQ';
const SECRET_KEY = 'Ms27jfzUWtFdsJiGgQFNIKXQH7I5QJUs';

// アクセストークン取得（OAuth2 Client Credentials）
async function getAccessToken(): Promise<string> {
  const res = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: SECRET_KEY,
    }),
  });
  if (!res.ok) throw new Error('アクセストークン取得失敗');
  const data = await res.json();
  return data.access_token;
}

// キャンペーンデータ取得
export const fetchCampaignData = async (): Promise<CampaignData[]> => {
  const accessToken = await getAccessToken();
  // 実際のAPIエンドポイントに合わせて修正してください
  const res = await fetch(`${BASE_URL}/campaigns`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('キャンペーンデータ取得失敗');
  const json = await res.json();
  // 必要に応じてデータ整形
  return (json.campaigns || []).map((c: any) => ({
    id: c.campaignId,
    name: c.campaignName,
    status: c.status === 'ACTIVE' ? 'アクティブ' : c.status === 'PAUSED' ? '一時停止' : '終了',
    impressions: c.impressions,
    clicks: c.clicks,
    cost: c.spend,
    conversions: c.conversions,
    ctr: c.impressions > 0 ? (c.clicks / c.impressions) * 100 : 0,
    cpa: c.conversions > 0 ? c.spend / c.conversions : 0,
  }));
};

// 日次パフォーマンスデータ取得
export const fetchDailyPerformance = async (): Promise<DailyPerformance[]> => {
  const accessToken = await getAccessToken();
  // 実際のAPIエンドポイント・パラメータに合わせて修正してください
  const res = await fetch(`${BASE_URL}/reports/daily`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('日次パフォーマンスデータ取得失敗');
  const json = await res.json();
  // 必要に応じてデータ整形
  return (json.reports || []).map((d: any) => ({
    date: d.date,
    impressions: d.impressions,
    clicks: d.clicks,
    cost: d.spend,
  }));
};
