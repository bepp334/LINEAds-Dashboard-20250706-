
import React from 'react';
import { LineIcon } from './icons';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <LineIcon />
                        <h1 className="text-xl font-bold text-gray-800 ml-3">LINE Ads パフォーマンスダッシュボード</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
