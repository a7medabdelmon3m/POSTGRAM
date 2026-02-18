import React, { useState } from 'react';
import CardHeader from '../cardHeader/CardHeader';

export default function Comment({ commentDetails }) {
  const [isLiked, setIsLiked] = useState(false);

  // دالة لحساب "منذ متى" (Time Ago)
  

  return (
    <div className="flex flex-col items-start mb-2 group">
      
      {/* 1. جسم الكومنت */}
      <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 px-3 py-2 rounded-2xl w-fit max-w-full">
        <CardHeader
          user={commentDetails?.commentCreator}
          // رجعنا التاريخ هنا عشان يظهر جنب الاسم فوق
          date={commentDetails?.createdAt} 
          commentContent={commentDetails?.content}
          commentImage={commentDetails?.image}
          cat={'comment'}
        />
      </div>

      {/* 2. شريط التفاعل (تحت الكومنت) */}
      <div className="flex items-center gap-4 mt-1 ml-3 text-xs font-semibold text-gray-500">
        
        {/* زرار اللايك التفاعلي */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`cursor-pointer hover:underline transition-colors ${
            isLiked ? "text-blue-600 font-bold" : "hover:text-gray-700"
          }`}
        >
          Like
        </button>

        {/* زرار الريبلاي */}
        <button className="cursor-pointer hover:text-gray-700 hover:underline transition-colors">
          Reply
        </button>

        {/* المدة الزمنية (Time Ago) */}
        <span className="font-normal text-gray-400 cursor-default text-[11px]">
          1h
        </span>

      </div>
    </div>
  );
}