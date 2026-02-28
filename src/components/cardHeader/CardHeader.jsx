import React, { useContext } from "react";
import elwan from "../../assets/images/elwan.png";
import { GoDotFill } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { addToast, Button, Image } from "@heroui/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";
import { authContext } from "../../useContext/authContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


  function convertDate(rawDate) {
    const date = new Date(rawDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

export default function CardHeader({
  user,
  date,
  commentContent,
  commentImage,
  cat,
  commentCreatorId,
  commentId,
  postID,
  handleSetIsEdit
}) {
  const {userData}= useContext(authContext) ;
  // console.log(userData.user)
  // console.log(commentId)
  const { name, photo } = user || {};

  function handelDeleteComment(){
    return axios.delete(`https://route-posts.routemisr.com/posts/${postID}/comments/${commentId}` ,{
       headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`},
    })
  }
  const obj =  useQueryClient() ; 

  const {mutate:deleteComment} =  useMutation({
    mutationFn:handelDeleteComment,
    onSuccess:()=>{
      addToast({
                    title: "congratulations",
                    description:'comment is deleteed successfully',
                    color: 'success',
                    timeout:'1500'
                  })
                  obj.invalidateQueries({queryKey:["getComments"]})
                  obj.invalidateQueries({queryKey:["getPosts"]})
                  obj.invalidateQueries({queryKey:["getPostById",postID]})
    },
    onError:()=>{
      addToast({
                    title: "Oops!",
                    description:'error in deleting Comment',
                    color: 'danger',
                    timeout:'1500'
                  })
    }
  })

  //   console.log(user);

  return cat === "comment" ? (
    <div className="flex  items-start space-x-3">
      {}
     <img
        src={photo}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-[#589FC7] p-px cursor-pointer" // برواز أزرق للصورة
        onError={(e) => {
          e.target.src = elwan;
        }}
      />
      <div>
        <div className="flex items-center gap-1">
          <p className="font-bold text-sm text-[#02624B] hover:underline cursor-pointer">
            {name}
          </p>
          <GoDotFill size={8} color="gray" />
          <p className="text-xs text-gray-400">{convertDate(date)}</p>
          {}
        </div>
        {/* comment content  */}
        <p className="py-2">{commentContent}</p>
        {commentImage && (
          <div className=" pb-2 relative">
            <Image
              alt="Comment preview"
              src={commentImage}
              width={200}
              className="rounded-lg shadow-sm relative z-1"
            />
          </div>
        )}
      </div>
      
      <Dropdown>
        <DropdownTrigger>
          <Button size="md"isIconOnly className="min-w-0 w-8 h-8 p-0 " radius="full" variant="light"><BsThreeDots /></Button>
        </DropdownTrigger>
        {(userData.user === commentCreatorId) &&
          <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={handleSetIsEdit} key="edit" textValue="edit" className="text-secondary"  >Edit </DropdownItem>
          <DropdownItem onClick={deleteComment} key="delete" textValue="delete" className="text-danger">
            Delete 
          </DropdownItem>
        </DropdownMenu>
        }
        {(userData.user !== commentCreatorId) &&
          <DropdownMenu DropdownMenu aria-label="Static Actions">
          <DropdownItem key="hide" textValue="hide" className="text-secondary"  >Hide</DropdownItem>
          <DropdownItem key="report" textValue="report" className="text-danger">
            Report
          </DropdownItem>
        </DropdownMenu>
        }
        

        
      </Dropdown>
    </div>
  ) : (
    <div className="flex items-center space-x-3">
      <img
        src={photo}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-[#589FC7] p-[1px] cursor-pointer" // برواز أزرق للصورة
        onError={(e) => {
          e.target.src = elwan;
        }}
      />
      <div className="flex flex-col">
        <p className="font-bold text-sm text-[#02624B] hover:underline cursor-pointer">
          {name}
        </p>
        <p className="text-xs text-gray-400">{convertDate(date)}</p>
      </div>
    </div>
  );
}
