import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useLike(postId) {
    const queryObj = useQueryClient() ; 
  function handleLike() {
    // console.log(postId);
    
    return axios.put(`https://route-posts.routemisr.com/posts/${postId}/like`,{}, {
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
    });
  }

  const {isPending , mutate:like} = useMutation({
    mutationFn:handleLike,
    onSuccess:() =>{
        // console.log(postId);
        
        queryObj.invalidateQueries({ queryKey: ["getPosts"] });
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
