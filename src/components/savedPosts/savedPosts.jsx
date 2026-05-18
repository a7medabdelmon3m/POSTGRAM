import React from "react";
import { Chip } from "@heroui/react"; // الهيرو يو آي الأساسي بتاعنا
import useSavedPosts from "./useSavedPosts";
import { Helmet } from "react-helmet";
import Post from "../postCard/Post";
import { SyncLoader } from "react-spinners";

export default function SavedPostsPage() {
  const { allSavedPosts, isLoading } = useSavedPosts();
  // console.log('allSavedPosts : ' , allSavedPosts);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SyncLoader color="#F7BF2D" size={10} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" dir="ltr">
      {/* Main Responsive Container */}
      <div className="max-w-6xl mx-auto">
        {/* 1. Header Section (Title + Saved Count) */}
        <div className="flex items-center justify-between border-b border-default-200 pb-5 mb-8">
          <div className="flex items-center gap-3">
            {/* SVG Bookmark Icon الصافي بدون أي مكتبة */}
            <div className="p-2 bg-primary-50 text-primary rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M5 2h14a2 2 0 0 1 2 2v18l-9-5-9 5V4a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-default-900 tracking-tight">
                Saved Bookmarks
              </h1>
              <p className="text-sm text-default-500 mt-1">
                Posts you have saved to review later
              </p>
            </div>
          </div>

          {/* Saved Posts Counter Badge */}
          <Chip
            color="primary"
            variant="flat"
            className="font-semibold text-sm px-3 py-1 h-auto"
          >
            {allSavedPosts.length}{" "}
            {allSavedPosts.length === 1 ? "post" : "posts"}
          </Chip>
        </div>

        {/* 2. Grid Layout Wrapper for Cards */}
        {allSavedPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-default-50 rounded-2xl border border-default-200 min-h-[300px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-default-400 mb-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-default-700">
              No Saved Posts
            </h3>
            <p className="text-sm text-default-400 mt-1 max-w-xs">
              Your bookmarked posts will appear here.
            </p>
          </div>
        ) : (
          <>
            {" "}
            <Helmet>
              <title>Saved Posts</title>
            </Helmet>
            {allSavedPosts?.map((post) => (
              <Post
                key={post._id}
                post={post}
                isPostDetails={false}
                queryKey={["getSavedPosts"]}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
