import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Sparkles, Calendar, Clock, Cog, ArrowLeft, Cloud, RefreshCw, MoreVertical, Edit2, Trash2, X, Check } from 'lucide-react';
import BackupComponent from './components/BackupComponent';

const WowMomentsApp = () => {
  const [moments, setMoments] = useState([]);
  const [newMoment, setNewMoment] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);
  const [backupComponent, setBackupComponent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const storedMoments = localStorage.getItem('wowMoments');
    if (storedMoments) {
      setMoments(JSON.parse(storedMoments));
    }

    const savedSettings = localStorage.getItem('wowMomentsSettings');
    if (savedSettings) {
      const { autoBackup: savedAutoBackup } = JSON.parse(savedSettings);
      setAutoBackup(Boolean(savedAutoBackup));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wowMoments', JSON.stringify(moments));
    if (autoBackup && moments.length > 0 && backupComponent?.handleBackup) {
      backupComponent.handleBackup();
    }
  }, [moments, autoBackup, backupComponent]);

  const backupComponentRef = useCallback((node) => {
    if (node !== null) {
      setBackupComponent(node);
    }
  }, []);

  const handleAutoBackupChange = (checked) => {
    setAutoBackup(checked);
    const settings = {
      autoBackup: checked
    };
    localStorage.setItem('wowMomentsSettings', JSON.stringify(settings));
  };

  // 編輯功能
  const startEditing = (id, content) => {
    setEditingId(id);
    setEditingContent(content);
    setOpenMenuId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent('');
  };

  const saveEdit = (id) => {
    setMoments(moments.map(moment => 
      moment.id === id ? { ...moment, content: editingContent } : moment
    ));
    setEditingId(null);
    setEditingContent('');
  };

  // 刪除功能
  const deleteMoment = (id) => {
    setMoments(moments.filter(moment => moment.id !== id));
    setOpenMenuId(null);
  };

  // 選單控制
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const addMoment = () => {
    if (newMoment.trim() !== '') {
      const newId = Date.now();
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const formattedTime = now.toTimeString().slice(0, 5);
      const newMomentObj = { 
        id: newId, 
        date: formattedDate, 
        time: formattedTime, 
        content: newMoment 
      };
      
      setMoments(prev => [newMomentObj, ...prev]);
      setNewMoment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMoment();
    }
  };

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              返回
            </button>
            <div className="flex items-center">
              <Cog className="mr-2" size={20} />
              <h1 className="text-xl font-semibold">設定</h1>
            </div>
            <div className="w-8" />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">備份與同步</h2>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start">
                <Cloud className="mr-3 text-gray-500 mt-1" size={20} />
                <div>
                  <p className="font-medium">自動備份</p>
                  <p className="text-sm text-gray-500">新增回憶時自動備份到 Google Drive</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoBackup}
                  onChange={(e) => handleAutoBackupChange(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <BackupComponent ref={backupComponentRef} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-4">關於</h2>
            <div className="text-sm text-gray-500">
              <p>感謝使用 Wow Moments</p>
              <p className="mt-2">由 Kyle Hsia 設計開發</p>
              <p className="mt-4 text-center text-xs">© 2024 Wow Moments. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Sparkles className="mr-2 text-yellow-400" />
        Wow Moments
        <button 
          onClick={() => setShowSettings(true)}
          className="ml-auto p-2 text-gray-600 hover:text-gray-800"
        >
          <Cog size={20} />
        </button>
      </h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow mr-2 p-2 border rounded-lg shadow-sm"
          placeholder="記錄新的精彩時刻..."
          value={newMoment}
          onChange={(e) => setNewMoment(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={addMoment} 
          className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-gray-800"
        >
          <PlusCircle className="mr-2" size={20} />
          新增
        </button>
      </div>

      {moments.length > 0 ? (
        moments.map((moment) => (
          <div key={moment.id} className="bg-white shadow rounded-lg p-4 mb-4 relative">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <Calendar className="mr-1" size={16} />
                {moment.date}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1" size={16} />
                {moment.time}
              </span>
            </div>

            {editingId === moment.id ? (
              <div>
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <div className="flex justify-end">
                  <button onClick={() => saveEdit(moment.id)} className="mr-2 text-green-600">
                    <Check size={20} />
                  </button>
                  <button onClick={cancelEditing} className="text-red-600">
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-6">{moment.content}</p>
                <Sparkles className="text-yellow-400 absolute bottom-2 left-2" size={16} />
                <button 
                  onClick={() => toggleMenu(moment.id)} 
                  className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <MoreVertical size={20} />
                </button>
                {openMenuId === moment.id && (
                  <div className="absolute bottom-8 right-2 bg-white shadow-lg rounded-lg py-2 z-10">
                    <button 
                      onClick={() => startEditing(moment.id, moment.content)} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <Edit2 size={16} className="inline mr-2" /> 編輯
                    </button>
                    <button 
                      onClick={() => deleteMoment(moment.id)} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 size={16} className="inline mr-2" /> 刪除
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <div className="text-center mt-8 text-gray-500">
          開始記錄你的 Wow 時刻吧！
        </div>
      )}
    </div>
  );
};

export default WowMomentsApp;