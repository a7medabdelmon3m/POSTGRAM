import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { div } from "framer-motion/client";
// import { body } from 'framer-motion/client'
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaArrowCircleRight } from "react-icons/fa";

export default function CommentCreation({ postId, queryKey }) {
  const [commentValue, setcommentValue] = useState(null);
  const queryCleientObj = useQueryClient();

  const commentBody = {
    content: commentValue,
    post: postId,
  };
  function handleAddComment() {
    return axios.post(
      "https://linked-posts.routemisr.com/comments",
      commentBody,
      {
        headers: {
          token: localStorage.getItem("postGramTkn"),
        },
      },
    );
  }
  const { data, isError, isSuccess, error, isPending, mutate } = useMutation({
    mutationFn: handleAddComment,
    onSettled: () => {},
    onError: () => {
      console.log(error, data, isError, isSuccess);
    },
    onSuccess: () => {
      queryCleientObj.invalidateQueries({ queryKey: queryKey });
    },
  });
  return (
    <div>
      <div className="flex items-center p-3 border-t border-gray-100 bg-white rounded-b-lg">
        <button className="text-gray-400 hover:text-[#F7BA1C] pr-2 transition-colors">
          <BsEmojiSmile size={22} />
        </button>
        <input
          onChange={(e) => {
            setcommentValue(e.target.value);
            // console.log(e.target.value);
          }}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 outline-none text-sm mx-2 text-gray-700 placeholder-gray-400 bg-transparent"
        />
        {/* button*/}
        <button
          disabled={
            isPending ||
            !commentValue ||
            commentValue?.length <= 1 ||
            commentValue?.length > 30
          }
          onClick={mutate}
          className={`${isPending || !commentValue || commentValue?.length <= 1 || commentValue?.length > 30 ? "cursor-not-allowed" : ""} text-[#589FC7] font-bold text-sm hover:text-[#02624B] transition-colors disabled:opacity-50`}
        >
          <FaArrowCircleRight size={24} color="#F7BA1C" />
        </button>
      </div>
      <p
        className={`${commentValue?.length <= 1 && !!commentValue   ? "" : "hidden"} text-red-500 pl-10 text-[12px]`}
      >
        Comment must be at least 2 characters long
      </p>
      <p
        className={`${commentValue?.length >30   ? "" : "hidden"} text-red-500 pl-10 text-[12px]`}
      >
        Comment must be maximum 30 characters long
      </p>
    </div>
  );
}
