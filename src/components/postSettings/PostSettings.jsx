import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
  addToast,
} from "@heroui/react";
import {
  BsThreeDots,
  BsBookmark,
  BsLink45Deg,
  BsPersonSlash,
  BsEyeSlash,
} from "react-icons/bs";
import { FiEdit3, FiTrash2, FiShare2, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostSettings({ user, userData , postId }) {
  const { name, _id } = user;
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";
  // console.log( 'userData.user', userData.user )
  // console.log('user', user)
  function handleDeletePost(){
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
       headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`},
    })
  }
  const obj = useQueryClient()
  const { mutate:deletePost} = useMutation({
    mutationFn:handleDeletePost,
    onSuccess:() =>{
       addToast({
                    title: "congratulations",
                    description:'post is deleteed successfully',
                    color: 'success',
                    timeout:'1500'
                  })
                  obj.invalidateQueries({queryKey:['getPosts']})
    },
    onError:()=>{
       addToast({
                    title: "opps!",
                    description:'error in deleting post',
                    color: 'danger',
                    timeout:'1500'
                  })
    },
    
  })

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="light"
          isIconOnly
          aria-label="Settings"
          className="min-w-fit"
        >
          <BsThreeDots size={20} className="text-gray-600" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Post Actions" variant="faded">
        <DropdownItem
          key="save"
          textValue="save"
          startContent={<BsBookmark className={iconClasses} />}
        >
          Save Post
        </DropdownItem>

        <DropdownItem
          key="copy"
          textValue="copy"
          startContent={<BsLink45Deg className={iconClasses} />}
        >
          Copy Link
        </DropdownItem>

        <DropdownItem
          key="share"
          textValue="share"
          startContent={<FiShare2 className={iconClasses} />}
        >
          Share via...
        </DropdownItem>

        {_id === userData.user && (
          <DropdownItem
            key="edit"
            textValue="edit"
            startContent={<FiEdit3 className={iconClasses} />}
          >
            Edit Post
          </DropdownItem>
        )}

        {_id === userData.user && (
          <DropdownItem
          onClick={deletePost}
            key="delete"
            textValue="delete"
            className="text-danger"
            color="danger"
            startContent={
              <FiTrash2 className={cn(iconClasses, "text-danger")} />
            }
          >
            Delete Post
          </DropdownItem>
        )}

        {_id !== userData.user && (
          <DropdownItem
            key="hide"
            textValue="hide"
            showDivider={_id === userData.user}
            startContent={<BsEyeSlash className={iconClasses} />}
          >
            Hide Post
          </DropdownItem>
        )}

        {_id !== userData.user && (
          <DropdownItem
            key="unfollow"
            textValue="unfollow"
            className="text-warning"
            startContent={
              <BsPersonSlash className={cn(iconClasses, "text-warning")} />
            }
          >
            Unfollow <span className="font-bold">{name}</span>
          </DropdownItem>
        )}

        {_id !== userData.user && (
          <DropdownItem
            key="report"
            textValue="report"
            className="text-danger"
            color="danger"
            startContent={
              <FiAlertCircle className={cn(iconClasses, "text-danger")} />
            }
          >
            Report Post
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
