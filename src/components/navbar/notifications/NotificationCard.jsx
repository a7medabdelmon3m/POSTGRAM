// components/Notification/NotificationCard.jsx

import { FaBell } from "react-icons/fa";
import { timeAgo } from "../../../utils/timeFormat";
import { Link } from "@heroui/react";



export default function NotificationCard({
  title,
  description,
  actor,
  time,
  read = false,
  onClick,
  postId,
  commentId
}) {
  const isComment = title === 'comment_post'?`#comment-${commentId}`:'' ; 
  console.log('isComment' , isComment);
  
  return (
    <Link
    href={`/postDetails/${postId}${isComment}`}
    onClick={onClick}
      className={`
        cursor-pointer
        relative flex items-start gap-4 rounded-2xl border p-4
        ${
          read
            ? "border-gray-200 bg-white"
            : "border-blue-200 bg-blue-50"
        }
      `}
    >
      {/* unread dot */}
      {!read && (
        <span className="absolute right-4 top-4 h-3 w-3 rounded-full bg-blue-500" />
      )}

      {/* icon */}
      <div
        className={`
          flex h-12 w-12 items-center justify-center rounded-full
          ${read ? "bg-gray-100" : "bg-blue-100"}
        `}
      >
        <FaBell
          className={`h-5 w-5 ${
            read ? "text-gray-500" : "text-blue-600"
          }`}
        />
      </div>

      {/* content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            {title === 'comment_post' ? 'Comment': title === 'like_post' ? 'React': title === 'share_post' ?'Share' : ''}
          </h3>

          <span className="text-xs text-gray-400">
            {timeAgo(time) }
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          {title === 'comment_post' ? <span> <span className="text-green-500 underline">{actor}</span>  mentioned you in a comment</span> : title === 'like_post' ? <span> <span className="text-green-500 underline">{actor}</span>  liked one of your posts</span> : title === 'share_post' ? <span> <span className="text-green-500 underline">{actor}</span>  Shared Your Post </span> :'' }
          
        </p>
      </div>
    </Link>
  );
}