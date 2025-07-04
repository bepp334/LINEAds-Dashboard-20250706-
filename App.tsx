
import React, { useState, useEffect, useCallback } from 'react';
import { fetchCampaignData, fetchDailyPerformance } from './services/mockApi';
import { generateInsight } from './services/geminiService';
import { CampaignData, DailyPerformance } from './types';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import PerformanceChart from './components/PerformanceChart';
import CampaignTable from './components/CampaignTable';
import AiInsight from './components/AiInsight';
import { ClicksIcon, CostIcon, CpaIcon, CtrIcon, ImpressionsIcon, ConversionsIcon } from './components/icons';

const App: React.FC = () => {
    const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
    const [dailyData, setDailyData] = useState<DailyPerformance[]>([]);
    const [aiInsight, setAiInsight] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getAiInsight = useCallback(async (performanceData: DailyPerformance[], campaignData: CampaignData[]) => {
        try {
            const insight = await generateInsight(performanceData, campaignData);
            setAiInsight(insight);
        } catch (err) {
            console.error("AIインサイトの生成に失敗しました:", err);
            setAiInsight("AIインサイトの取得中にエラーが発生しました。APIキーが設定されているか確認してください。");
        }
    }, []);
    
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [campaignData, performanceData] = await Promise.all([
                    fetchCampaignData(),
                    fetchDailyPerformance()
                ]);
                setCampaigns(campaignData);
                setDailyData(performanceData);
                await getAiInsight(performanceData, campaignData);
            } catch (err) {
                setError("データの読み込みに失敗しました。");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getAiInsight]);

    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const averageCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const averageCpa = totalConversions > 0 ? totalCost / totalConversions : 0;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-6">
                    <KpiCard title="インプレッション" value={totalImpressions.toLocaleString()} icon={<ImpressionsIcon />} />
                    <KpiCard title="クリック数" value={totalClicks.toLocaleString()} icon={<ClicksIcon />} />
                    <KpiCard title="コンバージョン" value={totalConversions.toLocaleString()} icon={<ConversionsIcon />} />
                    <KpiCard title="広告費用" value={`¥${Math.round(totalCost).toLocaleString()}`} icon={<CostIcon />} />
                    <KpiCard title="CTR" value={`${averageCtr.toFixed(2)}%`} icon={<CtrIcon />} />
                    <KpiCard title="CPA" value={`¥${Math.round(averageCpa).toLocaleString()}`} icon={<CpaIcon />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                        <PerformanceChart data={dailyData} isLoading={isLoading} />
                    </div>
                    <div className="lg:col-span-1">
                        <AiInsight insight={aiInsight} isLoading={isLoading} />
                    </div>
                </div>

                <CampaignTable data={campaigns} isLoading={isLoading} />
            </main>
        </div>
    );
};

export default App;
