import React from 'react';
// تأكد إنك عامل Import للأفاتار من HeroUI
import { Avatar } from "@heroui/react"; 

// 1. المكون الرئيسي (Container Component)
export function FollowSuggestions({ children }) {
  return (
    <aside className="w-full max-w-sm bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
      {children}
    </aside>
  );
}

// 2. مكون العنوان الرئيسي (Header Component)
FollowSuggestions.Header = function SuggestionsHeader({ title = "Who to follow" }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <button  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors">
        Show more
      </button>
    </div>
  );
};

// 3. مكون القائمة (List Wrapper Component)
FollowSuggestions.List = function SuggestionsList({ children }) {
  return <div className="space-y-3.5">{children}</div>;
};

// 4. مكون كارت المستخدم الفردي (Card Item Component)
FollowSuggestions.Card = function SuggestionCard({ user, onFollow, isPending }) {
  // صورة افتراضية لو الأفاتار مش راجع من الـ API
  const userPhoto = user.photo || "https://via.placeholder.com/150";

  return (
    <div className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-200">
      
      {/* بيانات المستخدم وصورة HeroUI */}
      <div className="flex items-center gap-3 min-w-0">
        
        {/* استخدمنا الأفاتار هنا مع الإطار الأزرق */}
        <Avatar 
          src={userPhoto} 
          name={user.name} // بيعرض الحرف الأول لو الصورة مش موجودة
          isBordered 
          color="primary" 
          size="md"
        />

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate hover:underline cursor-pointer">
            {user.name}
          </span>
          <span className="text-[11px] text-slate-400 truncate tracking-wide">
            @{user.username}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5">
            {user.followersCount} followers
          </span>
        </div>
      </div>

      {/* زرار الفولو */}
      <button 
      disabled={isPending}
        onClick={() => onFollow(user._id)}
        className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 px-3 py-1.5 rounded-full transition-all duration-150 shadow-sm active:scale-95 shrink-0"
      >
        {isPending?'Following...' :'Follow'}
      </button>

    </div>
  );
};