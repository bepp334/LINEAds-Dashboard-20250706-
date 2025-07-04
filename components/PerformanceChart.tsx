
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DailyPerformance } from '../types';

interface PerformanceChartProps {
    data: DailyPerformance[];
    isLoading: boolean;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-blue-500">{`クリック数 : ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-green-500">{`インプレッション : ${payload[1].value.toLocaleString()}`}</p>
        <p className="text-red-500">{`費用 : ¥${Math.round(payload[2].value).toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-line-green"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">過去30日間のパフォーマンス推移</h3>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" tickFormatter={(value) => new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format(value as number)} tick={{ fontSize: 12 }}/>
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `¥${new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format(value as number)}`} tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="clicks" name="クリック数" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                        <Line yAxisId="left" type="monotone" dataKey="impressions" name="インプレッション" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }}/>
                        <Line yAxisId="right" type="monotone" dataKey="cost" name="費用" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;
