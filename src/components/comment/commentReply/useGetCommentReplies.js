import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

export default function useGetCommentReplies(postId , commentId) {
  
    const [isEnabled, setisEnabled] = useState(false)
    function  handleGetCommentsReplies(){
        return axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies` ,{
             headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
        },
        })
    }

    const {data , isLoading , isError} = useQuery({
        queryKey:['getCommentReplies', commentId],
        queryFn:handleGetCommentsReplies,
        enabled:!!localStorage.getItem("postGramTkn") && isEnabled
    })

    const allCommentReplies = data?.data?.data?.replies;

   const  loadReplies = () => setisEnabled(true)
    // console.log(allCommentReplies);

    return { loadReplies, allCommentReplies ,isLoading , isError ,isEnabled}
    
}
