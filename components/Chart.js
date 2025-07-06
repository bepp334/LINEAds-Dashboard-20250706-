import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Chart = ({ data, type = 'line', title, height = 300 }) => {
  const formatTooltip = (value, name) => {
    if (name === 'impressions' || name === 'clicks') {
      return [value.toLocaleString(), name === 'impressions' ? 'インプレッション' : 'クリック'];
    } else if (name === 'spend') {
      return [`¥${value.toLocaleString()}`, '広告費'];
    } else if (name === 'ctr') {
      return [`${value}%`, 'CTR'];
    }
    return [value, name];
  };

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const renderChart = () => {
    if (type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              formatter={formatTooltip}
              labelFormatter={(label) => {
                const date = new Date(label);
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="impressions" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="インプレッション"
            />
            <Line 
              type="monotone" 
              dataKey="clicks" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="クリック"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            <Bar dataKey="spend" fill="#f59e0b" name="広告費" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {data && data.length > 0 ? (
        renderChart()
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          データがありません
        </div>
      )}
    </div>
  );
};

export default Chart; 