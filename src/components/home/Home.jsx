import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BiErrorCircle } from "react-icons/bi";

import useHome from "./useHome";
import Post from "../postCard/Post";
import Loading from "../loading/Loading";
import PostCreation from "../postCreation/PostCreation";

export default function Home() {
  const [feedType, setFeedType] = useState("all");
  
  const { 
    allPosts, 
    isLoading, 
    isError, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useHome(feedType);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200;

      if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && !isFetchingNextPage) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-117.5 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <BiErrorCircle size={50} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            We couldn't retrieve the posts at the moment. Please check your connection or try again later.
          </p>
          <button
            onClick={() => refetch()} 
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Postgram - Home</title>
      </Helmet>
      
      <PostCreation />

      <div className="flex bg-gray-100 p-1 rounded-xl max-w-sm mx-auto mb-8 mt-4 shadow-inner">
        <button
          onClick={() => setFeedType("all")}
          className={`flex-1 py-2.5 text-center rounded-lg font-bold text-sm transition-all duration-300 ${
            feedType === "all"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setFeedType("following")}
          className={`flex-1 py-2.5 text-center rounded-lg font-bold text-sm transition-all duration-300 ${
            feedType === "following"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Following
        </button>
      </div>

      {allPosts?.length > 0 ? (
        allPosts.map((post) => (
          <Post
            key={post._id}
            post={post}
            isPostDetails={false}
            queryKey={["getPosts", feedType]} 
          />
        ))
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white border border-gray-200 rounded-xl shadow-sm max-w-2xl mx-auto mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feedType === "following"
                ? "No posts to show"
                : "No posts available"}
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              {feedType === "following"
                ? "You are not following anyone yet, or the people you follow haven't posted anything."
                : "There are no posts here yet. Be the first to share something!"}
            </p>
          </div>
        )
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}