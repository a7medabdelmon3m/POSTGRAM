import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useNoti() {
  const queryClient = useQueryClient()
   function getAllNotification() {
      return axios.get(
        "https://route-posts.routemisr.com/notifications",
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    }
   
    const { data, isLoading, isError /*, isFetching , refetch*/ } = useQuery({
      queryKey: ["getNotifications"],
      queryFn: getAllNotification,
      // refetchOnMount:false,
      // refetchInterval:3000 * 60,
      // retry:5,
      // retryDelay:2000,
      // staleTime:5000,
      // gcTime:3000,
      enabled: !!localStorage.getItem("postGramTkn"),
    });
    function markNotAsRead(notificationId) {
      return axios.patch(
        `https://route-posts.routemisr.com/notifications/${notificationId}/read`
        ,
        {},
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    }
    const mutation = useMutation({
      
    mutationFn: markNotAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      console.log('hello from home notification');
      
    },
  });
  const allNotifications = data?.data?.data?.notifications;


    return {allNotifications, isLoading , isError ,getAllNotification , markAsRead:mutation.mutate}
}
