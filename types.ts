
export interface CampaignData {
  id: string;
  name: string;
  status: 'アクティブ' | '一時停止' | '終了';
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpa: number;
}

export interface DailyPerformance {
  date: string;
  impressions: number;
  clicks: number;
  cost: number;
}
