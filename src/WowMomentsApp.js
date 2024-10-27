import React, { useState, useEffect } from 'react';
import { PlusCircle, Sparkles, Calendar, Clock, MoreVertical, Edit2, Trash2, X, Check } from 'lucide-react';
import BackupComponent from './components/BackupComponent';

const WowMomentsApp = () => {
  const [moments, setMoments] = useState([]);
  const [newMoment, setNewMoment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const storedMoments = localStorage.getItem('wowMoments');
    if (storedMoments) {
      setMoments(JSON.parse(storedMoments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wowMoments', JSON.stringify(moments));
  }, [moments]);

  const addMoment = () => {
    if (newMoment.trim() !== '') {
      const newId = Date.now();
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const formattedTime = now.toTimeString().slice(0, 5);
      setMoments([{ id: newId, date: formattedDate, time: formattedTime, content: newMoment }, ...moments]);
      setNewMoment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMoment();
    }
  };

  const deleteMoment = (id) => {
    setMoments(moments.filter(moment => moment.id !== id));
    setOpenMenuId(null);
  };

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

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Sparkles className="mr-2 text-yellow-400" /> Wow Moments
      </h1>

      {/* 新增備份元件 */}
      <div className="mb-6">
        <BackupComponent />
      </div>

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
          <PlusCircle className="mr-2" size={20} /> 新增
        </button>
      </div>
      
      {moments.length > 0 ? (
        moments.map((moment) => (
          <div key={moment.id} className="bg-white shadow rounded-lg p-4 mb-4 relative">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <Calendar className="mr-1" size={16} /> {moment.date}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1" size={16} /> {moment.time}
              </span>
            </div>
            {editingId === moment.id ? (
              <div>
                <input
                  type="text"
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
                    <button onClick={() => startEditing(moment.id, moment.content)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      <Edit2 size={16} className="inline mr-2" /> 編輯
                    </button>
                    <button onClick={() => deleteMoment(moment.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
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
