import React from 'react';
import { Avatar, Link } from "@heroui/react"; 
import { FaCheck } from 'react-icons/fa';

export function FollowSuggestions({ children }) {
  return (
    <aside className="w-full h-full max-w-sm flex flex-col bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm overflow-hidden">
      {children}
    </aside>
  );
}

FollowSuggestions.Header = function SuggestionsHeader({ title = "Who to follow" }) {
  return (
    <div className="flex items-center justify-between mb-3 px-1 shrink-0">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors">
        Show more
      </button>
    </div>
  );
};

FollowSuggestions.List = function SuggestionsList({ children }) {
  return (
    <div className="
      flex-1 
      min-h-0 
      space-y-3.5 
      overflow-y-auto 
      pr-1.5 
      [&::-webkit-scrollbar]:w-1.5 
      [&::-webkit-scrollbar-track]:bg-transparent 
      [&::-webkit-scrollbar-thumb]:bg-slate-200 
      [&::-webkit-scrollbar-thumb]:rounded-full 
      hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 
      dark:[&::-webkit-scrollbar-thumb]:bg-slate-800 
      dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-700
    ">
      {children}
    </div>
  );
};

FollowSuggestions.Card = function SuggestionCard({ user, onFollow, isPending, isSuccess }) {
  const userPhoto = user.photo || "https://via.placeholder.com/150";

  return (
    <div className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar 
          src={userPhoto} 
          name={user.name} 
          isBordered 
          color="primary" 
          size="md"
        />

        <div className="flex flex-col min-w-0">
          <Link href={`/UserProfile/${user.id || user._id}`} className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate hover:underline cursor-pointer">
            {user.name}
          </Link>
          <span className="text-[11px] text-slate-400 truncate tracking-wide">
            @{user.username}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">
            {user.followersCount} followers
          </span>
        </div>
      </div>

      <button 
        disabled={isPending}
        onClick={() => onFollow(user._id)}
        className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 px-3 py-1.5 rounded-full transition-all duration-150 shadow-sm active:scale-95 shrink-0"
      >
        {isPending ? 'Following...' : isSuccess ? <span className="flex items-center gap-1">Followed <FaCheck className="text-[10px]" /></span> : 'Follow'}
      </button>
    </div>
  );
};