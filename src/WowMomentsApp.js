import React, { useState, useEffect } from 'react';
import { PlusCircle, Sparkles, Calendar, Clock } from 'lucide-react';

const WowMomentsApp = () => {
  const [moments, setMoments] = useState([]);
  const [newMoment, setNewMoment] = useState('');

  // 从 localStorage 加载数据
  useEffect(() => {
    const storedMoments = localStorage.getItem('wowMoments');
    if (storedMoments) {
      setMoments(JSON.parse(storedMoments));
    }
  }, []);

  // 将数据保存到 localStorage
  useEffect(() => {
    localStorage.setItem('wowMoments', JSON.stringify(moments));
  }, [moments]);

  const addMoment = () => {
    if (newMoment.trim() !== '') {
      const newId = Date.now(); // 使用时间戳作为唯一ID
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const formattedTime = now.toTimeString().slice(0, 5);
      setMoments([{ id: newId, date: formattedDate, time: formattedTime, content: newMoment }, ...moments]);
      setNewMoment('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Sparkles className="mr-2 text-yellow-400" /> Wow Moments
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow mr-2 p-2 border rounded-lg shadow-sm"
          placeholder="記錄新的精彩時刻..."
          value={newMoment}
          onChange={(e) => setNewMoment(e.target.value)}
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
          <div key={moment.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <Calendar className="mr-1" size={16} /> {moment.date}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1" size={16} /> {moment.time}
              </span>
            </div>
            <p>{moment.content}</p>
            <Sparkles className="text-yellow-400 mt-2" size={16} />
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