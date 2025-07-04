
import React from 'react';
import { AiIcon } from './icons';

interface AiInsightProps {
    insight: string;
    isLoading: boolean;
}

const AiInsight: React.FC<AiInsightProps> = ({ insight, isLoading }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow h-full flex flex-col">
            <div className="flex items-center mb-4">
                <AiIcon />
                <h3 className="text-lg font-semibold text-gray-800 ml-2">AIによる分析レポート</h3>
            </div>
            {isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                   <div className="space-y-3 w-full">
                        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-4/6"></div>
                        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded-full animate-pulse w-2/6"></div>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-mono">
                    {insight}
                </div>
            )}
        </div>
    );
};

export default AiInsight;
