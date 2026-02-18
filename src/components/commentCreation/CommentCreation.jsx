import React, { useState, useRef } from "react";
// ضفنا Image هنا في الـ import
import { Image } from "@heroui/react"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IoCameraOutline, IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
// import { url } from "zod/v4-mini";

export default function CommentCreation({ postId, queryKey }) {
  const [commentValue, setCommentValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [imagePreview, setimagePreview]= useState(null);
  const textareaRef = useRef(null);
  const imgRef = useRef(null);
  const queryClientObj = useQueryClient();

   function handleChangeImage(e){
    setimagePreview(URL.createObjectURL(e.target.files[0])) ;
 }
   function handleClearImage(){
    setimagePreview(null) ;
    imgRef.current.value ='' ;

 }
  
  function handleAddComment() {
    const content = new FormData();
    if (textareaRef.current.value.trim()) {
      content.append("content", textareaRef.current.value.trim());
    }
    if(imgRef.current.value){
      content.append("image" ,imgRef.current.files[0] )
    }
    
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      content,
      {
       headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
      }
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddComment,
    onSuccess: () => {
      queryClientObj.invalidateQueries({ queryKey: queryKey });
      setCommentValue("");
      setIsFocused(false);
       handleClearImage() ;
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
     
    },
    onError: (error) => {
      console.log(error);
      alert("Error adding comment: " + error.response?.data?.message);
    },
  });

  const handleInput = (e) => {
    setCommentValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="px-3 pb-2">
      <div
        className={`flex flex-col bg-[#f0f2f5] rounded-[18px] border transition-all duration-200 ${
          isFocused
            ? "bg-white shadow-sm border-gray-300"
            : "border-transparent"
        }`}
      >
        <div className="flex items-start p-2">
          <textarea
            ref={textareaRef}
            value={commentValue}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            placeholder="Write a comment..."
            rows={1}
            disabled={isPending}
            className="w-full bg-transparent border-none outline-none resize-none text-[15px] text-gray-800 placeholder-gray-500 min-h-[36px] max-h-[120px] overflow-y-auto py-2 px-2 dir-auto"
          />

          {commentValue.trim().length > 0 && (
            <button
              onClick={mutate}
              disabled={isPending}
              className="mt-2 text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer"
            >
              <IoSend size={20} className={isPending ? "opacity-50" : ""} />
            </button>
          )}
        </div>

        {/* دلوقتي الـ Image هيشتغل صح لأننا عملنا له Import */}
        {
          imagePreview &&
          <div className="px-4 pb-2 relative">
          <Image
            alt="Comment preview"
            src={imagePreview}
            width={200}
            className="rounded-lg shadow-sm relative z-1"
          />
          <IoMdCloseCircleOutline onClick={handleClearImage} size={24}  className="absolute bg-black p-1 rounded-full cursor-pointer text-white top-1.5 left-5 z-10"/>
          
        </div>
        } 
        

        {isFocused && (
          <div className="flex items-center justify-between px-2 pb-2 mt-[-5px]">
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-green-600 hover:bg-gray-200 p-1.5 rounded-full transition-colors">
                <label className="cursor-pointer">
                  <input ref={imgRef} type="file" hidden onChange={handleChangeImage} />
                  <IoCameraOutline size={20} />
                </label>
              </button>
              <button className="text-gray-500 hover:text-yellow-600 hover:bg-gray-200 p-1.5 rounded-full transition-colors">
                <BsEmojiSmile size={19} />
              </button>
            </div>

            <span className="text-[10px] text-gray-400">
              {commentValue.length}/100
            </span>
          </div>
        )}
      </div>

      {commentValue.length > 0 && commentValue.length < 2 && (
        <p className="text-red-500 text-xs mt-1 ml-2">Comment is too short.</p>
      )}
    </div>
  );
}