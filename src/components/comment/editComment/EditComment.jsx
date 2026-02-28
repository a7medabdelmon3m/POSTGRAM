import React, { useRef, useState } from "react";
import elwan from "../../../assets/images/elwan.png";
import { addToast, Button, Image } from "@heroui/react";
import { IoCameraOutline, IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function EditComment({ commentDetails, onCancel }) {
  const { content, commentCreator, image, post, _id } = commentDetails;

  const [isFocused, setIsFocused] = useState(false);
  const [commentValue, setCommentValue] = useState(content || "");
  const [commentImage, setCommentImage] = useState(image || null);
  // const [imgIsDeleted, setimgIsDeleted] = useState(false);
  const textareaRef = useRef();
  const imgRef = useRef();
  const obj = useQueryClient();

  // function handdle() {
  //   console.log('img value', imgRef.current?.value);
  //   console.log('input value', textareaRef.current?.value);
  // }

  const handleInput = (e) => {
    setCommentValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setCommentImage(URL.createObjectURL(e.target.files[0]));
      // setimgIsDeleted(false)
    }
  }
  function handleClearImage(){
    imgRef.current.value ='' ;
    setCommentImage(null);
    // setimgIsDeleted(true)
    // console.log('image in input ==> ' ,imgRef.current.value );
    // console.log('image in useState ==> ' ,commentImage );
    
  }
  function handleClearComment() {
    imgRef.current.value = "";
    setCommentImage(null);
    setCommentValue("");
    handleCancelEdit();
  }

  function handleCancelEdit() {
    setCommentValue(content || "");
    setCommentImage(image || null);
    if (onCancel) {
      onCancel();
    }
  }
console.log(_id);

  function handleEditComment() {
    const body = new FormData();
    if (textareaRef.current.value) {
      body.append("content", commentValue);
    }
    if (imgRef.current?.files[0]) {
      body.append("image", imgRef.current.files[0]);
    }
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post}/comments/${_id}`,
      body,
      {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
        },
      },
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: handleEditComment,
    onSuccess: async (resp) => {
      await obj.invalidateQueries({ queryKey: ["getComments"] });
      addToast({
        title: "congratulations",
        description: resp.data?.message,
        color: "success",
        timeout: "1500",
      });
      handleClearComment();
    },
    onError: (err) => {
      console.log('msg' ,  err);
      
      addToast({
        title: "Sorry!",
        description: err.response?.data?.message || err.message || "Something went wrong",
        color: "danger",
        timeout: "1500",
      });
    },
    onSettled: () => {},
  });

  return (
    <div className="w-full py-3 px-4 bg-white rounded-xl shadow-sm">
      <div className="flex gap-3 items-start">
        <div className="shrink-0">
          <img
            src={commentCreator?.photo}
            alt="user"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#589FC7] p-px cursor-pointer"
            onError={(e) => {
              e.target.src = elwan;
            }}
          />
        </div>

        <div className="grow">
          <div
            className={`flex flex-col bg-[#f0f2f5] rounded-2xl border transition-all duration-200 ${
              isFocused
                ? "bg-white shadow-md border-blue-400"
                : "border-transparent"
            }`}
          >
            <div className="flex items-end p-2 gap-2">
              <textarea
                ref={textareaRef}
                value={commentValue}
                onChange={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => !commentValue && setIsFocused(false)}
                placeholder="Write a comment..."
                rows={1}
                className="w-full bg-transparent border-none outline-none resize-none text-[15px] text-gray-800 placeholder-gray-500 min-h-10 max-h-37.5 overflow-y-auto py-2 px-3"
              />

              {commentValue?.trim().length > 0 && (
                <Button
                  onPress={mutate}
                  isLoading={isPending}
                  className="mb-1 text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors flex items-center justify-center"
                >
                  {!isPending && <IoSend size={18} />}
                </Button>
              )}
            </div>

            <div className="px-3 pb-2">
              {commentImage && (
                <div className="relative inline-block">
                  <Image
                    alt="Comment preview"
                    src={commentImage}
                    width={150}
                    className="rounded-lg shadow-sm border border-gray-200"
                  />
                  <IoMdCloseCircleOutline
                    onClick={handleClearImage}
                    size={24}
                    className="absolute bg-black p-1 rounded-full cursor-pointer text-white top-1.5 left-2 z-10"
                  />
                </div>
              )}
            </div>

            {(isFocused || commentValue.trim().length > 0) && (
              <div className="flex items-center justify-between px-3 pb-2 border-t border-gray-200/50 pt-2 mx-2">
                <div className="flex gap-1">
                  <button className="text-gray-500 hover:text-blue-600 hover:bg-gray-200 p-2 rounded-full transition-colors">
                    <label className="cursor-pointer flex items-center">
                      <input
                        ref={imgRef}
                        onChange={handleImageChange}
                        type="file"
                        hidden
                      />
                      <IoCameraOutline size={20} />
                    </label>
                  </button>
                  <button className="text-gray-500 hover:text-yellow-600 hover:bg-gray-200 p-2 rounded-full transition-colors">
                    <BsEmojiSmile size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {commentValue.length} / 100
                  </span>

                  <button
                    onClick={handleCancelEdit}
                    className="text-[13px] text-red-500 hover:text-red-700 hover:bg-red-50 font-medium px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {commentValue.length > 0 && commentValue.length < 2 && (
            <p className="text-red-500 text-[11px] mt-1 ml-2 font-medium">
              Comment is too short.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
