import React, { useState, useEffect } from 'react';

const ConfigPanel = ({ onConfigSave, isOpen, onClose }) => {
  const [config, setConfig] = useState({
    accessKey: '',
    secretKey: '',
    accountId: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ローカルストレージから設定を読み込み
    const savedConfig = localStorage.getItem('lineAdsConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 設定をローカルストレージに保存
      localStorage.setItem('lineAdsConfig', JSON.stringify(config));
      
      // 親コンポーネントに設定を渡す
      await onConfigSave(config);
      
      // 設定パネルを閉じる
      onClose();
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('lineAdsConfig');
    setConfig({
      accessKey: '',
      secretKey: '',
      accountId: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">LINE Ads API設定</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="accessKey" className="block text-sm font-medium text-gray-700 mb-1">
              Access Key
            </label>
            <input
              type="text"
              id="accessKey"
              name="accessKey"
              value={config.accessKey}
              onChange={handleInputChange}
              className="input-field"
              placeholder="LINE Ads API Access Key"
              required
            />
          </div>

          <div>
            <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700 mb-1">
              Secret Key
            </label>
            <input
              type="password"
              id="secretKey"
              name="secretKey"
              value={config.secretKey}
              onChange={handleInputChange}
              className="input-field"
              placeholder="LINE Ads API Secret Key"
              required
            />
          </div>

          <div>
            <label htmlFor="accountId" className="block text-sm font-medium text-gray-700 mb-1">
              Account ID
            </label>
            <input
              type="text"
              id="accountId"
              name="accountId"
              value={config.accountId}
              onChange={handleInputChange}
              className="input-field"
              placeholder="A12345678"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              LINE Ads Managerで確認できるアカウントID（A12345678形式）
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleSave}
            disabled={isLoading || !config.accessKey || !config.secretKey || !config.accountId}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '保存中...' : '保存'}
          </button>
          <button
            onClick={handleClear}
            className="btn-secondary"
          >
            クリア
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">設定方法</h4>
          <ol className="text-xs text-blue-800 space-y-1">
            <li>1. LINE Ads Managerにログイン</li>
            <li>2. 設定 → API設定でキーを取得</li>
            <li>3. 上記の情報を入力して保存</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel; 