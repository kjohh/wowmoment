// src/components/legal/CookieConsentBanner.js
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export const CookieConsentBanner = () => {
  const [showConsent, setShowConsent] = useState(false);

  // 改用函數來檢查 cookie 同意狀態
  const checkConsentStatus = () => {
    const hasConsent = localStorage.getItem('cookieConsent');
    setShowConsent(!hasConsent);
  };

  useEffect(() => {
    // 組件掛載時檢查狀態
    checkConsentStatus();

    // 添加事件監聽器來檢測 localStorage 的變化
    window.addEventListener('storage', checkConsentStatus);

    return () => {
      window.removeEventListener('storage', checkConsentStatus);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  // 添加一個測試按鈕（開發時使用）
  const handleReset = () => {
    localStorage.removeItem('cookieConsent');
    setShowConsent(true);
  };

  // CookieConsentBanner.js 中的條件渲染部分
if (!showConsent) {
  // 只在開發環境（development）顯示重設按鈕
  return process.env.NODE_ENV === 'development' ? (
    <button
      onClick={handleReset}
      className="fixed bottom-4 right-4 bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
      style={{ zIndex: 50 }}
    >
      重設 Cookie 設定
    </button>
  ) : null;
}

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white border-t shadow-lg p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-teal-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-700">
                為了提供更好的服務體驗，我們使用必要的 Cookie。繼續使用本網站，即表示您同意我們的
                <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline ml-1">
                  隱私權政策
                </a>
                和
                <a href="/terms" className="text-teal-600 hover:text-teal-700 underline ml-1">
                  服務條款
                </a>
                。
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              我同意
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};