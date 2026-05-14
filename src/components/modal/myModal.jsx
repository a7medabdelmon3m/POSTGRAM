import React, { useContext } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { handleGetProfile } from "../../utils/getProfileData";
import { authContext } from "../../useContext/authContext";
import { CiImageOn } from "react-icons/ci";
import { PulseLoader } from "react-spinners";
import useShare from "../postCard/useShare";

export default function MyModal({
  type = "post",
  postContent,
  setpostContent,
  imagePreview,
  handleClearImage,
  imageEle,
  handleChangeImage,
  handleCloseModal,
  isPending,
  mutate,
  isOpen,
  onOpenChange,
  postId,
}) {
  // console.log('postId from modal  : ' , postId);

  const { sharePost, isLoading,  } = useShare(
    postId,
    () => {
      setpostContent(""); 
      onOpenChange(false); 
    },
  );
  const { user } = useContext(authContext);

  const { data: userPhoto } = useQuery({
    queryFn: handleGetProfile,
    queryKey: ["getProfile"],
    enabled: !!localStorage.getItem("postGramTkn"),
  });
  return (
    <div>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-4 items-center">
                {type === "post" ? "Create post" : "Share post"}

                <Card className="self-stretch">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <Avatar
                        isBordered
                        radius="full"
                        color="warning"
                        size="md"
                        src={userPhoto?.data?.data?.user?.photo}
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          {user?.name}
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          @{user?.username}
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 ">
                <Textarea
                  //    ref={capEle}
                  value={postContent}
                  onChange={(e) => {
                    setpostContent(e.target.value);
                  }}
                  className="w-full"
                  placeholder={`What are you thinking ${user?.name}?`}
                />
                {imagePreview && (
                  <div className="w-full relative">
                    <img
                      alt="HeroUI hero Image"
                      src={imagePreview}
                      className="rounded-lg"
                    />
                    <IoMdCloseCircleOutline
                      onClick={handleClearImage}
                      size={24}
                      className=" cursor-pointer absolute top-2 right-2 text-white"
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {type === "post" && (
                  <Button className="mr-auto" radius="full">
                    <label className=" flex justify-center items-center">
                      <input
                        type="file"
                        hidden
                        ref={imageEle}
                        onChange={handleChangeImage}
                      />
                      <CiImageOn className="text-blue-700" size={24} />
                      photo
                    </label>
                  </Button>
                )}

                <Button
                  className="font-semibold"
                  color="danger"
                  onPress={
                    type === "shared"
                      ? () => {
                          setpostContent("");
                          onOpenChange(false);
                        }
                      : handleCloseModal
                  }
                >
                  Close
                </Button>

                <Button
                  className={`font-semibold ${isPending || (!postContent.trim() && !imagePreview) ? "cursor-not-allowed opacity-50" : ""}`}
                  color="success"
                  onPress={
                    type === "post"
                      ? mutate
                      : () => {
                          sharePost(postContent);

                          
                        }
                  }
                  isDisabled={
                    type === "post"
                      ? isPending || (!postContent.trim() && !imagePreview)
                      : isLoading
                  }
                >
                  {isPending || isLoading ? (
                    <div className="flex items-center">
                      <PulseLoader color="#F7BA1C" size={4} />
                    </div>
                  ) : type === "post" ? (
                    "post"
                  ) : (
                    "share"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
