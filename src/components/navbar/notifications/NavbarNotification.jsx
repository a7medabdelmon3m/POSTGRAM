import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

// import { Bell } from "lucide-react";
import Notification from "./index";
import { FaBell } from "react-icons/fa";
import useNoti from "./useNoti";
function isAllNotificationsRead(arr) {
  return arr?.every((x) => x.isRead === true);
}

export default function NavbarNotification() {
  const {
    allNotifications,
    isError,
    isLoading,
    markAsRead,
    markAllAsReadIslaoding,
    markAllAsRead,
  } = useNoti();
  // console.log("allNotifications : ", allNotifications);
  console.log('isAllNotificationsRead : ' , isAllNotificationsRead(allNotifications));
  // console.log('n.topComment?._id : ', allNotifications[1]?.entity?.topComment?._id);

  return (
    <Dropdown placement="bottom-end">
      {/* button */}
      <DropdownTrigger>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200">
          <FaBell className="h-5 w-5" />

          {/* unread badge */}
          {!isAllNotificationsRead(allNotifications) && (
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
          )}
        </button>
      </DropdownTrigger>

      {/* dropdown content */}
      <DropdownMenu aria-label="Notifications" className="w-95 p-0 min-h-100">
        <DropdownItem
          key="notifications"
          textValue="notifications"
          className="cursor-default p-0 hover:bg-transparent"
        >
          <div className="p-4">
            {/* title */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                isLoading={markAllAsReadIslaoding}
                onClick={markAllAsRead}
                className={`${isAllNotificationsRead(allNotifications) ? "text-gray-500" : "text-blue-500 cursor-pointer hover:underline transition-all duration-200"}`}
              >
                Mark All As Read
              </button>

              {allNotifications > 0 && (
                <span className="text-sm text-blue-600">
                  {allNotifications.length} New
                </span>
              )}
            </div>

            {/* notifications list */}

            <Notification>
              {isLoading ? (
                <div className="text-center text-gray-500">loading...</div>
              ) : isError ? (
                <div className="text-center text-red-500">There is error!</div>
              ) : allNotifications.length === 0 ? (
                <div className="text-center text-gray-500">
                  No Notifications
                </div>
              ) : (
                allNotifications.map((n) => (
                  <Notification.Card
                    key={n._id}
                    title={n.type}
                    description={n.entity?.topComment?.content}
                    time={n.createdAt}
                    read={n.isRead}
                    actor={n.actor?.name}
                    postId={n.entityId}
                    commentId={n?.entity?.topComment?._id}
                    onClick={() => {
                      if (!n.isRead) {
                        markAsRead(n._id);
                      }
                    }}
                  />
                ))
              )}
            </Notification>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
