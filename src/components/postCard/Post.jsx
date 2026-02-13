import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  BsChatDots,
  BsBookmark,
  BsFillBookmarkFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { FiSend, FiMoreHorizontal } from "react-icons/fi";
import CardHeader from "../cardHeader/CardHeader";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";

const Post = ({ post, isPostDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Destructuring Data
  const { body, image, user, createdAt, comments, _id } = post;

  const firstComment = comments[0];
  // console.log(post , isPostDetails);

  return (
    <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-lg shadow-md mb-8 max-w-md mx-auto md:max-w-lvh overflow-hidden">
      {/* . Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <CardHeader user={user} date={createdAt} cat={"post"}></CardHeader>
        <button className="text-gray-400 hover:text-[#02624B]">
          <FiMoreHorizontal size={20} />
        </button>
      </div>

      {/*  Post Body (النص) */}
      <div className="px-4 py-3">
        <p className="text-gray-800 text-sm leading-relaxed dir-auto whitespace-pre-wrap">
          {body}
        </p>
      </div>

      {/*  Post Image  */}
      {image && (
        <div className="w-full bg-gray-50 border-t border-b border-gray-100">
          <img
            src={image}
            alt="post content"
            className="w-full h-auto max-h-125 object-cover"
          />
        </div>
      )}

      {/* reacts  */}
      <div className="px-3 py-2 flex justify-between items-center mt-1">
        <div className="flex space-x-5 text-2xl text-gray-600">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="hover:scale-110 transition-transform duration-200"
          >
            {isLiked ? (
              <AiFillHeart className="text-red-500" />
            ) : (
              <AiOutlineHeart className="hover:text-red-500" />
            )}
          </button>
          <button className="hover:text-[#589FC7] transition-colors">
            <BsChatDots />
          </button>
          <button className="hover:text-[#589FC7] transition-colors">
            <FiSend />
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="text-2xl text-gray-600 hover:scale-110 transition-transform"
          >
            {isSaved ? (
              <BsFillBookmarkFill className="text-[#F7BA1C]" /> 
            ) : (
              <BsBookmark className="hover:text-[#F7BA1C]" />
            )}
          </button>
        </div>
      </div>

      {/* --- 5. Details & Static Comment Area --- */}
      <div className="px-4 pb-3">
        <p className="font-bold text-sm text-[#02624B] mb-2">
          {comments?.length || 0} Likes
        </p>

        {/* comments*/}

        {firstComment && (
          <div className="mt-3 bg-gray-200 p-3 rounded-lg border-l-4 border-[#F7BA1C]">
            {/* view all comments link*/}
            {!isPostDetails && comments?.length > 0 && (
              <Link
                to={`/postDetails/${_id}`}
                className="text-[#589FC7] text-xs font-medium mb-2 hover:underline"
              >
                View all {comments.length} comments
              </Link>
            )}

            
            {/* <Comment commentDetails = {firstComment} ></Comment> */}
            {isPostDetails ? (
            
              comments?.map((comment) => (
                <Comment
                  key={comment._id || comment.id}
                  commentDetails={comment}
                />
              ))
            ) : (
             
              <Comment commentDetails={firstComment} />
            )}
          </div>
        )}
      </div>

      {/* --- 6. Add Comment Input --- */}
      <div className="flex items-center p-3 border-t border-gray-100 bg-white">
        <button className="text-gray-400 hover:text-[#F7BA1C] pr-2 transition-colors">
          <BsEmojiSmile size={22} />
        </button>
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 outline-none text-sm mx-2 text-gray-700 placeholder-gray-400 bg-transparent"
        />
        {/* button*/}
        <button className="text-[#589FC7] font-bold text-sm hover:text-[#02624B] transition-colors disabled:opacity-50">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
