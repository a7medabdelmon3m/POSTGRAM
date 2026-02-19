import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@heroui/react";
import {
  BsThreeDots,
  BsBookmark,
  BsLink45Deg,
  BsPersonSlash,
  BsEyeSlash,
} from "react-icons/bs";
import { FiEdit3, FiTrash2, FiShare2, FiAlertCircle } from "react-icons/fi";

export default function PostSettings({ user, isMyPost }) {
  const { name } = user;
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  return (
    <Dropdown  placement="bottom-end">
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
          startContent={<BsBookmark className={iconClasses} />}
        >
          Save Post
        </DropdownItem>

        <DropdownItem
          key="copy"
          startContent={<BsLink45Deg className={iconClasses} />}
        >
          Copy Link
        </DropdownItem>

        <DropdownItem
          key="share"
          startContent={<FiShare2 className={iconClasses} />}
        >
          Share via...
        </DropdownItem>

        {isMyPost && (
          <DropdownItem
            key="edit"
            startContent={<FiEdit3 className={iconClasses} />}
          >
            Edit Post
          </DropdownItem>
        )}

        {isMyPost && (
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={
              <FiTrash2 className={cn(iconClasses, "text-danger")} />
            }
          >
            Delete Post
          </DropdownItem>
        )}

        <DropdownItem
          key="hide"
          showDivider={!isMyPost}
          startContent={<BsEyeSlash className={iconClasses} />}
        >
          Hide Post
        </DropdownItem>

        {
          !isMyPost &&
          <DropdownItem
            key="unfollow"
            className="text-warning"
            startContent={
              <BsPersonSlash className={cn(iconClasses, "text-warning")} />
            }
          >
            Unfollow <span className="font-bold">{name}</span>
          </DropdownItem>
        }

        {
          !isMyPost &&
          <DropdownItem
          key="report"
          className="text-danger"
          color="danger"
          startContent={
            <FiAlertCircle className={cn(iconClasses, "text-danger")} />
          }
        >
          Report Post
        </DropdownItem>
        }
      </DropdownMenu>
    </Dropdown>
  );
}
