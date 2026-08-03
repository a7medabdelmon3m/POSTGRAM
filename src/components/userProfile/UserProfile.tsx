import React, { useState } from "react";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaUserCheck,
  FaUserPlus,
  FaTimes,
  FaUserFriends,
} from "react-icons/fa";
import useUserProfile from "./useUserProfile";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ClipLoader, FadeLoader, SyncLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myData: responseData, isError, isLoading } = useUserProfile(id);
  const queryClient = useQueryClient();

  function handleNavigation(id: string) {
    navigate(`/UserProfile/${id}`);
    setIsModalOpen(false);
  }

  const { isSuccess, mutate, isPending } = useMutation({
    mutationFn: (userId) => {
      return axios.put(
        `https://route-posts.routemisr.com/users/${userId}/follow`,
        {},
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserProfile", id] });
      queryClient.invalidateQueries({ queryKey: ["getFollowSuggestion"] });
      queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
  });

  // حالة التحكم في الـ Modal والـ Active Tab (followers أو following)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#F7BF2D" size={10} />
      </div>
    );
  }

  if (isError || !responseData) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 font-semibold">
        عفواً، حدث خطأ أثناء تحميل بيانات البروفايل.
      </div>
    );
  }

  const { user, isFollowing } = responseData;

  const formatDate = (dateString:string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openListModal = (tabType:string) => {
    setActiveTab(tabType);
    setIsModalOpen(true);
  };

  const listData =
    activeTab === "followers" ? user?.followers : user?.following;

  return (
    <div className="max-w-4xl mx-auto my-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
      {/* Cover Image Header */}
      <div className="h-48 w-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 relative">
        {user.cover && (
          <img
            src={user.cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Header Details */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-6 gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.photo}
              alt={user.name}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-slate-900 object-cover shadow-md bg-white"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => mutate(user.id || user._id)}
              className={`flex justify-center items-center min-w-[142.2px] gap-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm cursor-pointer ${
                isFollowing
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isPending ? (
                <ClipLoader
                  size={16}
                  color={isFollowing ? "#334155" : "#ffffff"}
                />
              ) : isFollowing ? (
                <>
                  <FaUserCheck className="w-4 h-4" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <FaUserPlus className="w-4 h-4" />
                  <span>Follow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
              {user.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              @{user.username}
            </p>
          </div>

          {/* Extra Details */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-600 dark:text-slate-400">
            {user.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-slate-400" />
                <span>{user.email}</span>
              </div>
            )}
            {user.dateOfBirth && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-slate-400" />
                <span>Born {formatDate(user.dateOfBirth)}</span>
              </div>
            )}
            {user.createdAt && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-slate-400" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            )}
          </div>

          {/* Stats Bar (Clickable Buttons) */}
          <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            {/* Followers Trigger */}
            <button
              onClick={() => openListModal("followers")}
              className="flex items-center gap-2 group hover:bg-slate-50 dark:hover:bg-slate-800/50 px-3 py-1.5 rounded-xl transition-all"
            >
              <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {user.followersCount || user.followers?.length || 0}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200">
                Followers
              </span>
            </button>

            {/* Following Trigger */}
            <button
              onClick={() => openListModal("following")}
              className="flex items-center gap-2 group hover:bg-slate-50 dark:hover:bg-slate-800/50 px-3 py-1.5 rounded-xl transition-all"
            >
              <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {user.followingCount || user.following?.length || 0}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200">
                Following
              </span>
            </button>

            {/* Bookmarks */}
            <div className="flex items-center gap-2 px-3 py-1.5">
              <span className="font-bold text-slate-900 dark:text-white">
                {user.bookmarksCount || 0}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                Bookmarks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 MODAL / POPUP USERS LIST */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 pt-3">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("followers")}
                  className={`pb-3 font-semibold text-sm border-b-2 transition-all ${
                    activeTab === "followers"
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Followers ({user.followers?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("following")}
                  className={`pb-3 font-semibold text-sm border-b-2 transition-all ${
                    activeTab === "following"
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Following ({user.following?.length || 0})
                </button>
              </div>

              {/* Close Modal Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 transition-all mb-2"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Users List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50 p-2">
              {listData && listData.length > 0 ? (
                listData.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all"
                  >
                    <Link
                      to={`/UserProfile/${item._id || item.id}`}
                      onClick={() => setIsModalOpen(false)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="font-semibold text-sm text-slate-900 dark:text-white hover:underline truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          @
                          {item.username ||
                            item.name.toLowerCase().replace(/\s+/g, "")}
                        </p>
                      </div>
                    </Link>

                    {/* Quick Follow Action Button */}
                    <button
                      onClick={() => handleNavigation(item._id || item.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shrink-0"
                    >
                      View Profile
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <FaUserFriends className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No {activeTab} yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
