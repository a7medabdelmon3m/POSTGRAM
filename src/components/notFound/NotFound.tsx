import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Icon Container */}
      <div className="bg-red-50 dark:bg-slate-800/60 p-6 rounded-full mb-4 text-red-500 shadow-sm border border-red-100 dark:border-slate-700">
        <FaExclamationTriangle className="w-16 h-16" />
      </div>

      {/* 404 Header */}
      <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
        404
      </h1>
      
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Page Not Found!
      </h2>

      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/20"
      >
        <FaHome className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}