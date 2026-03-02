import React, { useState } from "react";
import CardHeader from "../cardHeader/CardHeader";
import { BsThreeDots } from "react-icons/bs";
import EditComment from "./editComment/EditComment";
import CommentCreation from "../commentCreation/CommentCreation";
import { Avatar } from "@heroui/react";
import useGetCommentReplies from "./commentReply/useGetCommentReplies";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Comment({
  commentDetails,
  isFirstComment = false,
  isReply = false,
  postId = null 
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReplyOn, setIsReplyOn] = useState(false);

  function handleGetProfile() {
    return axios.get("https://route-posts.routemisr.com/users/profile-data", {
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
    });
  }
  const { data } = useQuery({
    queryFn: handleGetProfile,
    queryKey: ["getProfile"],
    enabled: !!localStorage.getItem("postGramTkn"),
  });

  function handleSetIsEdit() {
    setIsEdit(!isEdit);
  }
  const idOfPost = postId || commentDetails.post;
  const { loadReplies, allCommentReplies, isLoading, isError } =
    useGetCommentReplies(idOfPost , commentDetails._id);

  return (
    <>
      {/* <button className="bg-amber-400" onClick={loadReplies}>
        hat el redod
      </button> */}
      {isEdit ? (
        <EditComment
          commentDetails={commentDetails}
          onCancel={handleSetIsEdit}
        />
      ) : (
        <div className="flex flex-col items-start mb-2 group">
          <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 px-3 py-2 rounded-2xl w-fit max-w-full">
            <CardHeader
              user={commentDetails?.commentCreator}
              date={commentDetails?.createdAt}
              commentContent={commentDetails?.content}
              commentImage={commentDetails?.image}
              cat={"comment"}
              commentCreatorId={commentDetails?.commentCreator?._id}
              commentId={commentDetails?._id}
              postID={commentDetails?.post}
              handleSetIsEdit={handleSetIsEdit}
            />
          </div>
          {!isFirstComment && (
            <div className="flex items-center gap-4 mt-1 ml-3 text-xs font-semibold text-gray-500">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`cursor-pointer hover:underline transition-colors ${
                  isLiked ? "text-blue-600 font-bold" : "hover:text-gray-700"
                }`}
              >
                Like
              </button>

              {!isReply && (
                <>
                  <button
                    onClick={() => {
                      setIsReplyOn(!isReplyOn);
                      loadReplies();
                    }}
                    className="cursor-pointer  hover:text-blue-600 hover:underline  transition-colors"
                  >
                    {isReplyOn ? (
                      <span>Hide replies</span>
                    ) : (
                      <span>Reply({commentDetails?.repliesCount || 0})</span>
                    )}
                  </button>

                  <span className="font-normal text-gray-400 cursor-default text-[11px]">
                    1h
                  </span>
                </>
              )}
            </div>
          )}

          {isReplyOn && (
            <>
              <div className=" min-w-full mt-5 ml-3 pl-2 border-l-1">
                {commentDetails.repliesCount > 0 ? (
                  isLoading ? (
                    <div className="pl-25 py-4 flex items-center">
                      <SyncLoader color="#F7BF2D" size={8} />
                    </div>
                  ) : isError ? (
                    <span className=" bg-red-300 borde border-red-500 rounded-xl p-2 text-red-500">
                      Something went wrong
                    </span>
                  ) : (
                    <>
                      {allCommentReplies?.map((reply) => (
                        <Comment
                          isReply={true}
                          key={reply._id}
                          commentDetails={reply}
                          userImage={data?.data?.data?.user?.photo}
                          postId={idOfPost}
                        />
                      ))}
                    </>
                  )
                ) : (
                  <p className=" mb-2 pl-25 text-gray-400 rounded-xl">
                    no replies
                  </p>
                )}

                <div className=" flex  min-w-full ">
                  <Avatar
                    size="sm"
                    isBordered
                    color="warning"
                    src={data?.data?.data?.user?.photo}
                  />

                  <CommentCreation
                    placeHolder={"Write a reply..."}
                    focus={true}
                    commentId={commentDetails?._id}
                    postId={idOfPost }
                    isReply={true}
                  ></CommentCreation>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
