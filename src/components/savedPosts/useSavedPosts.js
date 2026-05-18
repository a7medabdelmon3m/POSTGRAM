import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useSavedPosts() {
   function getSavedPosts() {
      return axios.get(
        "https://route-posts.routemisr.com/users/bookmarks?sort=-createdAt",
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    }
    const { data, isLoading, isError /*, isFetching , refetch*/ } = useQuery({
      queryKey: ["getSavedPosts"],
      queryFn: getSavedPosts,
      // refetchOnMount:false,
      // refetchInterval:3000 * 60,
      // retry:5,
      // retryDelay:2000,
      // staleTime:5000,
      // gcTime:3000,
      enabled: !!localStorage.getItem("postGramTkn"),
    });
  const allSavedPosts = data?.data?.data?.bookmarks || []


    return {allSavedPosts, isLoading , isError}
  
}
