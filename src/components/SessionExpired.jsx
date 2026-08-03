import React from 'react';
import { BiTimeFive } from "react-icons/bi";

export default function SessionExpired({ isOpen }) {
  if (!isOpen) return null;

  const handleLoginRedirect = () => {
    // بنمسح التوكن القديم من اللوكال ستوريدج
    localStorage.removeItem("postGramTkn");
    // بنوجه المستخدم لصفحة اللوجين
    window.location.href = "/login";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center transform transition-all scale-100 opacity-100">
        
        {/* أيقونة بتعبر عن الوقت أو انتهاء الجلسة */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <BiTimeFive className="h-10 w-10 text-red-500" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Session Expired
        </h3>
        
        <p className="text-gray-500 mb-8 px-4">
          Your session has expired due to inactivity. Please log in again to continue using Postgram.
        </p>

        <button
          onClick={handleLoginRedirect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}