
import React from 'react';

interface KpiCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow transition-shadow hover:shadow-lg">
            <div className="flex items-center">
                <div className="bg-gray-100 rounded-lg p-3">
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default KpiCard;
