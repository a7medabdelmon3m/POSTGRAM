import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useUserProfile(userId) {
   function getUserProfile() {
      return axios.get(
        `https://route-posts.routemisr.com/users/${userId}/profile`,
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    }
    
    const { data, isLoading, isError /*, isFetching , refetch*/ } = useQuery({
      queryKey: ["getUserProfile" ,userId ],
      queryFn: getUserProfile,
      // refetchOnMount:false,
      // refetchInterval:3000 * 60,
      // retry:5,
      // retryDelay:2000,
      // staleTime:5000,
      // gcTime:3000,
      enabled: !!localStorage.getItem("postGramTkn"),
    });
  const myData = data?.data?.data

  
    return {myData, isLoading , isError}
  
}
