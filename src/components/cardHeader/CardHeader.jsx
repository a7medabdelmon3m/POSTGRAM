import React from "react";
import elwan from "../../assets/images/elwan.png";
import { GoDotFill } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { Image } from "@heroui/react";

export default function CardHeader({
  user,
  date,
  commentContent,
  commentImage,
  cat,
}) {
  const { name, photo } = user || {};

  function convertDate(rawDate) {
    const date = new Date(rawDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
  //   console.log(user);

  return cat === "comment" ? (
    <div className="flex items-start space-x-3">
      {}
      <img
        src={photo}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-[#589FC7] p-[1px] cursor-pointer" // برواز أزرق للصورة
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
        <p>{commentContent}</p>
        {commentImage && (
          <div className="px-4 pb-2 relative">
            <Image
              alt="Comment preview"
              src={commentImage}
              width={200}
              className="rounded-lg shadow-sm relative z-1"
            />
          </div>
        )}
      </div>
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
        {/* اسم المستخدم باللون الأخضر المميز */}
        <p className="font-bold text-sm text-[#02624B] hover:underline cursor-pointer">
          {name}
        </p>
        <p className="text-xs text-gray-400">{convertDate(date)}</p>
      </div>
    </div>
  );
}
