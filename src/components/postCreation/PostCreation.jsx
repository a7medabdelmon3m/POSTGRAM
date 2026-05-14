import React, { useContext, useRef, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Image,
  Button,
  useDisclosure,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import { success } from "zod";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BiPointer } from "react-icons/bi";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authContext } from "../../useContext/authContext";
import { PulseLoader } from "react-spinners";
import MyModal from "../modal/myModal";
import { handleGetProfile } from "../../utils/getProfileData";
// import { body } from "framer-motion/client";

export default function PostCreation() {
  const { isOpen,onOpen, onOpenChange } = useDisclosure();
  const [imagePreview, setimagePreview] = useState(null);
  const [postContent, setpostContent] = useState("");
  const imageEle = useRef(null);
  //   const capEle = useRef(null) ;
  const queryClientObj = useQueryClient();

  // console.log(imageEle);

  function handleChangeImage(e) {
    // console.log('changed' ,  );
    setimagePreview(URL.createObjectURL(e.target.files[0]));
  }

  function handleClearImage() {
    setimagePreview(null);
    imageEle.current.value = "";
  }
  function handlePostCreation() {
    const content = new FormData();

    if (postContent) {
      content.append("body", postContent);
    } else if (imageEle.current.value) {
      content.append("body", " ");
    }
    if (imageEle.current.value) {
      content.append("image", imageEle.current.files[0]);
    }

    return axios.post("https://route-posts.routemisr.com/posts", content, {
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
    });
  }
  const { mutate, isPending } = useMutation({
    mutationFn: handlePostCreation,
    onError: (error) => {
      addToast({
        title: "opps!",
        description: error.response.data.message,
        color: "danger",
        timeout: "1500",
      });
    },
    onSuccess: (resp) => {
      handleClearImage();
      setpostContent("");
      onOpenChange(false);
      queryClientObj.invalidateQueries({ queryKey: ["getPosts"] });
      console.log(resp.data.message);

      addToast({
        title: "congratulations",
        description: resp.data.message,
        color: "success",
        timeout: "1500",
      });
    },
    onSettled: () => {},
  });
  function handleCloseModal() {
    handleClearImage();
    setpostContent("");
    onOpenChange(false);
  }
  const { user } = useContext(authContext);

  const { data: userPhoto } = useQuery({
    queryFn: handleGetProfile,
    queryKey: ["getProfile"],
    enabled: !!localStorage.getItem("postGramTkn"),
  });
  //  console.log( 'userphoto',userPhoto.data.data.user.photo);

  return (
    <div className="mb-6">
      <div className="container  max-w-md mx-auto md:max-w-3xl">
        <Card className="w-full  ">
          <CardHeader className="flex gap-3">
            <Avatar
              className="w-10 h-10 bg-red-500"
              isBordered
              color="warning"
              src={userPhoto?.data?.data?.user?.photo}
            />

            <div
              onClick={onOpen}
              className="w-full flex flex-row flex-wrap gap-4 cursor-pointer"
            >
              <Input
                isDisabled
                className="max-w-full "
                color={success}
                //   ahmed is changed later
                defaultValue={`What are you thinking ${user?.name}?`}
                type="text"
              />
            </div>
          </CardHeader>
        </Card>
        <>
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <MyModal
            handleChangeImage={handleChangeImage}
            handleCloseModal={handleCloseModal}
            imagePreview={imagePreview}
            setimagePreview={setimagePreview}
            mutate={mutate}
            isPending ={isPending}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            imageEle={imageEle}
            setpostContent={setpostContent}
            postContent = {postContent}
          />
        </>
      </div>
    </div>
  );
}
