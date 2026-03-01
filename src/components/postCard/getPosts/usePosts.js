import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function usePosts(_id) {
  function handleGetPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${_id}/comments`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
        },
      },
    );
  }
  const { data, /*isError, isSuccess,*/ isLoading, /*isFetched*/ } = useQuery({
    queryKey: ["getComments", _id],
    queryFn: handleGetPostComments,
    enabled: !!localStorage.getItem("postGramTkn"),
  });

  const comments = data?.data?.data?.comments;
  return {comments , isLoading}
}
