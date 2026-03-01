import React, { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { FaRegCommentAlt, FaShare } from "react-icons/fa";
import { FiMoreHorizontal, FiExternalLink } from "react-icons/fi"; 
import CardHeader from "../cardHeader/CardHeader";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";
import PostSettings from "../postSettings/PostSettings";
import CommentCreation from "../commentCreation/CommentCreation";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import NoComments from "../noComments/NoComments";
import { SyncLoader } from "react-spinners";
import { authContext } from "../../useContext/authContext";
import useLike from "./like/useLike";
import usePosts from "./getPosts/usePosts";

const Post = ({ post, isPostDetails }) => {
  const { body, image, user, createdAt, topComment, _id ,likes } = post;
  const {userData} = useContext(authContext) ;
  
  const isLikedByMe = likes.some((like) => like === userData.user || false)
  // console.log(isLikedByMe);
  

  const [isLiked, setIsLiked] = useState(isLikedByMe);
  // const [commentToEdit, setcommentToEdit] = useState(null)
  // function toggleSettings() {
  //   setIsSettingsOpen(!isSettingsOpen);
  // }


  // Destructuring Data
// console.log('post content from postSetting' , body , image);


  // Static Numbers
  const likesCount = post.likesCount;
  const sharesCount = post.sharesCount;
  const firstComment = topComment;

  const {comments , isLoading} =  usePosts(_id)
  const {isPending ,like} = useLike(_id)
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 max-w-md mx-auto md:max-w-3xl overflow-hidden font-sans relative">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between px-4 py-3 relative bg-[#F0F2F5] ">
        <CardHeader user={user} date={createdAt} cat={"post"} />
        <PostSettings user={user} isMyPost={false} userData = {userData} postId ={_id} postContent ={{body , image}} />
      </div>

      {/* 2. Post Body */}
      <div className="p-4 z-0 relative">
        <p className="text-gray-900 text-[15px] leading-normal dir-auto whitespace-pre-wrap">
          {body}
        </p>
      </div>

      {/* 3. Post Image */}
      {image && (
        <Link
          to={`/postDetails/${_id}`}
          className="block w-full bg-gray-100 cursor-pointer border-t border-gray-100"
        >
          <img
            src={image}
            alt="post content"
            className="w-full h-auto object-cover max-h-[600px]"
          />
        </Link>
      )}

      {/* 4. Stats Bar (Stats & View Details Link) */}
      <div className="px-4 py-3 flex justify-between items-center text-gray-500 text-sm border-b border-gray-200 mx-2">
        {/* Left: Likes */}
        <div className="flex items-center gap-1 cursor-pointer group">
          <div className="flex -space-x-1.5 overflow-hidden">
            <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white border-2 border-white z-20">
              <BiSolidLike size={10} />
            </div>
            <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-red-500 to-red-600 text-white border-2 border-white z-10">
              <AiFillHeart size={10} />
            </div>
          </div>
          <span className="ml-1 group-hover:underline text-gray-600">
            {likesCount}
          </span>
        </div>

        {/* Right: Comments, Shares & View Details */}
        <div className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm">
          {/* 1. Comments Link -> Post Details */}
          <Link
            to={`/postDetails/${_id}`}
            className="hover:underline cursor-pointer"
          >
            {post.commentsCount} comments
          </Link>

          {/* 2. Shares Count */}
          {sharesCount > 0 && (
            <span className="hover:underline cursor-pointer hidden sm:inline">
              {sharesCount} shares
            </span>
          )}

          {/* 3. View Details Link (New Request) */}
          <Link
            to={`/postDetails/${_id}`}
            className="flex items-center gap-1 hover:text-blue-600 hover:underline transition-colors ml-1 font-medium"
          >
            <span>View Details</span>
            <FiExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* 5. Action Buttons */}
      <div className="flex justify-between items-center px-2 py-1 mx-2 mb-1">
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            like();
          }}
          disabled ={isPending}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors hover:bg-gray-100 font-medium ${
            isLiked ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {isLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}
          <span>Like</span>
        </button>

        {/* Comment Button -> Post Details */}
        <Link
          to={`/postDetails/${_id}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors hover:bg-gray-100 text-gray-600 font-medium"
        >
          <FaRegCommentAlt size={18} />
          <span>Comment</span>
        </Link>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors hover:bg-gray-100 text-gray-600 font-medium">
          <FaShare size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* 6. Comments Section */}
      <div className="px-4 pb-4 border-t border-gray-100 pt-3">
        {/* View more comments */}
        {!isPostDetails && comments?.length > 1 && (
          <Link
            to={`/postDetails/${_id}`}
            className="text-gray-500 font-semibold text-sm hover:underline block mb-3"
          >
            View more comments
          </Link>
        )}

        <div className="flex flex-col gap-2">
          {isPostDetails ? (
            isLoading ? (
              <div className="m-auto">
                <SyncLoader color="#F7BF2D" size={10} />
              </div>
              
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment._id} commentDetails={comment}  />
              ))
            ) : (
              <NoComments />
            )
          ) : (
            firstComment && <Comment commentDetails={firstComment} />
          )}
        </div>

        <div className="mt-3">
          <CommentCreation postId={_id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
