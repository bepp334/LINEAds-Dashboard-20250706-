
import React from 'react';
import { CampaignData } from '../types';

interface CampaignTableProps {
    data: CampaignData[];
    isLoading: boolean;
}

const StatusBadge: React.FC<{ status: 'アクティブ' | '一時停止' | '終了' }> = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full inline-block";
    const statusClasses = {
        'アクティブ': "bg-green-100 text-green-800",
        '一時停止': "bg-yellow-100 text-yellow-800",
        '終了': "bg-gray-200 text-gray-700",
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const CampaignTable: React.FC<CampaignTableProps> = ({ data, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-64 animate-pulse bg-gray-200 rounded-md"></div>
            </div>
        );
    }
    
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">キャンペーン別パフォーマンス</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">キャンペーン名</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Imp</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">クリック</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">費用</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CV</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CPA</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={campaign.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{campaign.impressions.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{campaign.clicks.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{`¥${Math.round(campaign.cost).toLocaleString()}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{campaign.conversions.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{`${campaign.ctr.toFixed(2)}%`}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{`¥${Math.round(campaign.cpa).toLocaleString()}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignTable;
