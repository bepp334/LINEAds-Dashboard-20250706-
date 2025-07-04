
import { GoogleGenAI } from "@google/genai";
import { DailyPerformance, CampaignData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("APIキーが設定されていません。AIインサイト機能は利用できません。");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateInsight = async (dailyData: DailyPerformance[], campaignData: CampaignData[]): Promise<string> => {
    if (!API_KEY) {
        return "AIインサイトは現在利用できません。APIキーが設定されていません。";
    }

    const model = 'gemini-2.5-flash-preview-04-17';
    
    const prompt = `
あなたは経験豊富なデジタルマーケティングアナリストです。
以下のLINE広告のパフォーマンスデータ（JSON形式）を分析し、簡潔なサマリーを提供してください。

分析のポイント：
1.  **全体のパフォーマンス概観**: 過去30日間の主要指標（インプレッション、クリック、費用）の傾向を要約してください。
2.  **優秀なキャンペーン**: 最も成果の高いキャンペーン（例：CPAが低い、CTRが高いなど）を1つ特定し、その理由を推測してください。
3.  **改善が必要なキャンペーン**: 最も成果の低いキャンペーンを1つ特定し、その理由を推測してください。
4.  **具体的なアクション提案**: データに基づいた、実行可能な改善アクションを1つ提案してください。

レポートは、マーケティング担当者がすぐに行動に移せるように、専門用語を避け、明確かつ簡潔にまとめてください。

**日次パフォーマンスデータ:**
\`\`\`json
${JSON.stringify(dailyData, null, 2)}
\`\`\`

**キャンペーン別データ:**
\`\`\`json
${JSON.stringify(campaignData.map(c => ({ name: c.name, impressions: c.impressions, clicks: c.clicks, cost: c.cost, conversions: c.conversions, ctr: c.ctr.toFixed(2), cpa: c.cpa.toFixed(0) })), null, 2)}
\`\`\`
`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini APIへのリクエスト中にエラーが発生しました:", error);
        throw new Error("AIからのインサイト生成に失敗しました。");
    }
};
