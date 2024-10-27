import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LegalPageLayout = ({ title, lastUpdated, children }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回首頁
        </button>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          
          <div className="text-sm text-gray-500 mb-8">
            最後更新：{lastUpdated}
          </div>
          
          <div className="prose prose-teal max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};