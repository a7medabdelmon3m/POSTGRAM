import React, { useRef, useState } from "react";
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
  useDisclosure,
  Input,
  Textarea,
  addToast
} from "@heroui/react";
import { success } from "zod";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BiPointer } from "react-icons/bi";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { button } from "framer-motion/client";
// import { body } from "framer-motion/client";

export default function PostCreation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreview, setimagePreview] = useState(null);
  const [postConrent, setpostConrent] = useState("");
  const imageEle = useRef(null);
  //   const capEle = useRef(null) ;
  const queryClientObj = useQueryClient();

  //   console.log(imageEle);

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

    if (postConrent) {
      content.append("body", postConrent);
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
  const {mutate, isPending } = useMutation({
    mutationFn: handlePostCreation,
    onError: (resp) => {
        addToast({
              title: "opps!",
              description:resp.data.message,
              color: 'danger',
              timeout:'1500'
            })
    },
    onSuccess: (resp) => {
      handleClearImage();
      setpostConrent("");
      onOpenChange(false);
      queryClientObj.invalidateQueries({ queryKey: ["getPosts"] });
      console.log(resp.data.message);
      
      addToast({
              title: "congratulations",
              description:resp.data.message,
              color: 'success',
              timeout:'1500'
            })
    },
    onSettled: () => {},
  });
  function handleCloseModal() {
    handleClearImage();
    setpostConrent("");
    onOpenChange(false);
  }
 
  return (
    
    <div className="mb-6">
      <div className="container  max-w-md mx-auto md:max-w-2xl">
        <Card className="w-full  ">
          <CardHeader className="flex gap-3">
            <Avatar
              className="w-10 h-10 bg-red-500"
              isBordered
              color="warning"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />

            <div
              onClick={onOpen}
              className="w-full flex flex-row flex-wrap gap-4"
            >
              <Input
                isDisabled
                className="max-w-full "
                color={success}
                //   ahmed is changed later
                defaultValue="What are you thinking Ahmed?"
                type="text"
              />
            </div>
          </CardHeader>
        </Card>
        <>
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-4 items-center">
                    Craete post
                    <Card className="self-stretch">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <Avatar
                            isBordered
                            radius="full"
                            color="warning"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                          />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                              Ahmed
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                              @ahmed123
                            </h5>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-4 ">
                    <Textarea
                      //    ref={capEle}
                      value={postConrent}
                      onChange={(e) => {
                        setpostConrent(e.target.value);
                      }}
                      className="w-full"
                      placeholder="What are you thinking Ahmed?"
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

                    <Button
                      className="font-semibold"
                      color="danger"
                      onPress={handleCloseModal}
                    >
                      Close
                    </Button>
                    <Button
                      className={`font-semibold ${isPending || (!postConrent.trim() && !imagePreview && `cursor-not-allowed opacity-50`)}  `}
                      color="success"
                      onPress={mutate}
                      disabled={
                        isPending || (!postConrent.trim() && !imagePreview)
                      }
                    >
                      post
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>
    </div>
  );
}
