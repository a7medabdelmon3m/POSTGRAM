import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProfilePosts(_id) {


     function getAllPosts() {
      return axios.get(
        `https://route-posts.routemisr.com/users/${_id}/posts`,
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    }
    const { data, isLoading:isPendingPosts, isError /*, isFetching , refetch*/ } = useQuery({
      queryKey: ["getPosts"],
      queryFn: getAllPosts,
      // refetchOnMount:false,
      // refetchInterval:3000 * 60,
      // retry:5,
      // retryDelay:2000,
      // staleTime:5000,
      // gcTime:3000,
      enabled: !!localStorage.getItem("postGramTkn"),
    });
  const allPosts = data?.data?.data?.posts;


  return {allPosts , isPendingPosts ,isError }
}
