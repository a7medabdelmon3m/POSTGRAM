import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useHome(feedType = "all") {
  const getPosts = async ({ pageParam = 1 }) => {
    const endpoint =
      feedType === "following"
        ? `https://route-posts.routemisr.com/posts/feed?only=following&limit=10&page=${pageParam}`
        : `https://route-posts.routemisr.com/posts?sort=-createdAt&limit=10&page=${pageParam}`;

    const response = await axios.get(endpoint, {
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
    });
    
    return response;
  };

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getPosts", feedType],
    queryFn: getPosts,
    getNextPageParam: (lastPage, allPages) => {
      const posts = lastPage?.data?.posts || lastPage?.data?.data?.posts || [];
      if (posts.length === 10) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!localStorage.getItem("postGramTkn"),
  });

  const allPosts = data?.pages.flatMap(
    (page) => page?.data?.posts || page?.data?.data?.posts || []
  ) || [];

  return { 
    allPosts, 
    isLoading, 
    isError, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  };
}