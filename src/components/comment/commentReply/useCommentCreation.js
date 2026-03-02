import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'



export default function useCommentCreation(
  {
  postId,
  commentId = null , 
  queryKey,
  textareaRef,
  imgRef,
  setimagePreview,
  setCommentValue,
  setIsFocused,
  isReply = false
}  
) {
const queryClientObj = useQueryClient();
const commentEndPoint = `https://route-posts.routemisr.com/posts/${postId}/comments` ;
const replyEndPoint = `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies` ;

  function handleChangeImage(e) {
    setimagePreview(URL.createObjectURL(e.target.files[0]));
  }
  function handleClearImage() {
    setimagePreview(null);
    imgRef.current.value = "";
  }

 function handleAddComment() {
    const content = new FormData();
    if (textareaRef.current.value.trim()) {
      content.append("content", textareaRef.current.value.trim());
    }
    if (imgRef.current.value) {
      content.append("image", imgRef.current.files[0]);
    }

    return axios.post(
      `${isReply ? replyEndPoint:commentEndPoint}`,
      content,
      {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
        },
      },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddComment,
    onSuccess:  () => {
      if(isReply){
       queryClientObj.invalidateQueries({ queryKey: ['getCommentReplies', commentId]});
       queryClientObj.invalidateQueries({ queryKey: ['getPosts']});

      }
       queryClientObj.invalidateQueries({ queryKey: queryKey });
      
      setCommentValue("");
      setIsFocused(false);
      handleClearImage();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    },
    onError: (error) => {
      console.log(error);
      alert("Error adding comment: " + error.response?.data?.message);
    },
  });

    return {mutate, isPending ,handleClearImage ,handleChangeImage}
  
}
