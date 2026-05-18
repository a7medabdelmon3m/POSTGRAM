import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// بيانات تجريبية للأشخاص اللي عملوا لايك
// const likersData = [
//   {
//     id: 1,
//     name: "أحمد محمد",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//   },
//   {
//     id: 2,
//     name: "سارة علي",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
//   },
//   {
//     id: 3,
//     name: "عمر خالد",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
//   },
// ];

export default function PostLikesDropdown({ likesCount, postId }) {
  const getPostLiks = async () => {
    return await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}/likes`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
        },
      },
    );
  };
  const { data} = useQuery({
    queryFn: getPostLiks,
    queryKey: ["getPostLikes", postId],
    enabled: !!postId,
  });
  // console.log('postLikes : ' , );
  const liksList = data?.data?.data?.likes || [];
//   console.log('liksList : ', liksList);
  

  return (
    <div className="flex items-center justify-center">
      <Dropdown placement="bottom-start" className="w-64 p-0">
        <DropdownTrigger className="bg-transparent p-0 ">
          <Button
            isDisabled={likesCount === 0}
            disableRipple
            className="flex items-center gap-1 cursor-pointer group p-0!"
          >
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white border-2 border-white z-20">
                <BiSolidLike size={10} />
              </div>
              <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-red-500 to-red-600 text-white border-2 border-white z-10">
                <AiFillHeart size={10} />
              </div>
            </div>
            {likesCount !== 0 && (
              <span className="ml-1 group-hover:underline text-gray-600">
                {likesCount}
              </span>
            )}
          </Button>
        </DropdownTrigger>

        {/* قائمة الأشخاص */}
        <DropdownMenu className="max-h-68 overflow-y-auto" aria-label="قائمة المعجبين بالبوست" variant="faded">
          {liksList.map((user) => (
            <DropdownItem
              key={user._id}
              textValue={user.name}
              className="hover:bg-default-100 p-2"
            >
              <div
                className="flex items-center justify-between w-full"
                dir="rtl"
              >
                {/* الجزء الخاص بالصورة والاسم */}
                <div className="flex items-center gap-3">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-default-200"
                  />
                  <span className="text-sm font-medium text-default-800">
                    {user.name}
                  </span>
                </div>

                {/* علامة اللايك (القلب الأحمر) على الشمال */}
                <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white border-2 border-white z-20">
                  <BiSolidLike size={10} />
                </div>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
