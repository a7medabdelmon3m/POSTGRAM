import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useCommentLike(postId ,commentId) {
    const queryObj = useQueryClient() ; 
  function handleLike() {
    // console.log(postId);
    
    return axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,{}, {
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
    });
  }

  const {isPending , mutate:like} = useMutation({
    mutationFn:handleLike,
    onSuccess:() =>{
        // console.log(postId);
        
        // queryObj.invalidateQueries({ queryKey: ["getComments", postId] });
        queryObj.invalidateQueries({ queryKey: ["getPostById", postId] });
    },
    onError:(error) =>{
        console.log("Error liking post:", error);
    },
    // onSettled:() =>{

    // }
  })
  return {isPending , like}
}
