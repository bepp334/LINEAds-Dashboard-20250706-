import React, { useState, useEffect } from 'react';
import KPICard from './KPICard';
import Chart from './Chart';
import ConfigPanel from './ConfigPanel';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    // ローカルストレージから設定を読み込み
    const savedConfig = localStorage.getItem('lineAdsConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const fetchData = async (apiConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/line-ads-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiConfig),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'データの取得に失敗しました');
      }

      setData(result.data);
    } catch (err) {
      setError(err.message);
      console.error('データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigSave = async (newConfig) => {
    setConfig(newConfig);
    await fetchData(newConfig);
  };

  const handleRefresh = () => {
    if (config) {
      fetchData(config);
    }
  };

  const renderIcons = () => ({
    impressions: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    clicks: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    spend: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    ctr: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  });

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">LINE Ads ダッシュボード</h1>
          <p className="text-gray-600 mb-6">LINE Ads APIの設定を行ってください</p>
          <button
            onClick={() => setShowConfig(true)}
            className="btn-primary"
          >
            設定を開始
          </button>
          <ConfigPanel
            onConfigSave={handleConfigSave}
            isOpen={showConfig}
            onClose={() => setShowConfig(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">LINE Ads ダッシュボード</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="btn-secondary flex items-center space-x-2"
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{loading ? '更新中...' : '更新'}</span>
              </button>
              <button
                onClick={() => setShowConfig(true)}
                className="btn-primary"
              >
                設定
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">エラー</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && !data && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">データを取得中...</p>
            </div>
          </div>
        )}

        {data && (
          <>
            {/* KPIカード */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="インプレッション"
                value={data.summary.impressions}
                icon={renderIcons().impressions}
                color="primary"
              />
              <KPICard
                title="クリック"
                value={data.summary.clicks}
                icon={renderIcons().clicks}
                color="success"
              />
              <KPICard
                title="広告費"
                value={data.summary.spend}
                unit="円"
                icon={renderIcons().spend}
                color="warning"
              />
              <KPICard
                title="CTR"
                value={data.summary.ctr}
                unit="%"
                icon={renderIcons().ctr}
                color="danger"
              />
            </div>

            {/* グラフ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart
                data={data.dailyData}
                type="line"
                title="インプレッション・クリック推移"
                height={400}
              />
              <Chart
                data={data.dailyData}
                type="bar"
                title="広告費推移"
                height={400}
              />
            </div>
          </>
        )}

        {!loading && !data && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">データがありません</p>
            <button
              onClick={handleRefresh}
              className="btn-primary"
            >
              データを取得
            </button>
          </div>
        )}
      </main>

      <ConfigPanel
        onConfigSave={handleConfigSave}
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
      />
    </div>
  );
};

export default Dashboard; 