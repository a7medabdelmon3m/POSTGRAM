import React, { useState } from "react";
import CardHeader from "../cardHeader/CardHeader";
import { BsThreeDots } from "react-icons/bs";
import CommentEdition from "../commentEdition/CommentEdition";

export default function Comment({ commentDetails }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col items-start mb-2 group">
      <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 px-3 py-2 rounded-2xl w-fit max-w-full">
        <CardHeader
          user={commentDetails?.commentCreator}
          date={commentDetails?.createdAt}
          commentContent={commentDetails?.content}
          commentImage={commentDetails?.image}
          cat={"comment"}
          commentCreatorId = {commentDetails?.commentCreator?._id}
          commentId = {commentDetails?._id}
          postID = {commentDetails?.post}
         
        />
        
      </div>

      <div className="flex items-center gap-4 mt-1 ml-3 text-xs font-semibold text-gray-500">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`cursor-pointer hover:underline transition-colors ${
            isLiked ? "text-blue-600 font-bold" : "hover:text-gray-700"
          }`}
        >
          Like
        </button>

        <button className="cursor-pointer hover:text-gray-700 hover:underline transition-colors">
          Reply
        </button>

        <span className="font-normal text-gray-400 cursor-default text-[11px]">
          1h
        </span>
      </div>
      
    </div>
  );
}
