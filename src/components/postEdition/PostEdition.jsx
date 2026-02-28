import {
  addToast,
  Avatar,
  Button,
  Card,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import React, { useRef, useState } from "react";
import CardHeader from "../cardHeader/CardHeader";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { PulseLoader } from "react-spinners";
import elwan from "../../assets/images/elwan.png";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function PostEdition({ isOpen, onOpenChange, postContent ,postId }) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // console.log('post content from postEdition' , postContent);
  const myImg = useRef(null)
  const myText = useRef(null)
  const [postText, setpostText] = useState(postContent?.body || '')
  const [postImage, setpostImage] = useState(postContent?.image || null)
  const [newImage, setnewImage] = useState(null)
  const queryObj = useQueryClient() ; 

  function handleModalToggle(open) {
    if (!open) {
      setpostText(postContent?.body || "");
      setpostImage(postContent?.image || null);
      setnewImage(null);
    }
    onOpenChange(open);
  }
  
  function handlePostText(e){
    setpostText(e.target.value)
  }
  function handlePostImage(e){
    setpostImage(URL.createObjectURL(e.target.files[0]))
    setnewImage(e.target.files[0])
  }
  function handelClearModal(){
    handleModalToggle(false) ; 
    setnewImage(null) ; 
    myImg.current.value = ''
  }
  function HandleUpdatePost(){
    const updatedData = new FormData() ; 
    updatedData.append('body' , postText) ;
    if(newImage){
      updatedData.append('image' , newImage)
    }

    return axios.put(`https://route-posts.routemisr.com/posts/${postId}`,updatedData,
      {
           headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`},
      }
     )
  }
  const {isPending ,mutate} = useMutation({
    mutationFn:HandleUpdatePost,
    onSuccess:async (resp) =>{
      handelClearModal();
      await queryObj.invalidateQueries({queryKey :["getPosts"]})
      addToast({
              title: "congratulations",
              description:resp.data.message,
              color: 'success',
              timeout:'1500'
            })
    },
    onError:(resp) =>{
       addToast({
              title: "Sorry!",
              description:resp.data.message,
              color: 'danger',
              timeout:'1500'
            })
    },
    onSettled:() =>{

    }
  })

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={handleModalToggle}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center flex-col gap-1">
                Update Post
              </ModalHeader>
              <ModalBody>
                  <Textarea
                  ref={myText}
                    className="max-w-full text-4xl font-bold"
                    value={postText}
                    onChange={handlePostText}
                  />
                
                {postImage && (
                  <Image alt="HeroUI hero Image" src={postImage} />
                )}
              </ModalBody>
              <ModalFooter>
                <Button className="mr-auto" radius="full" variant="light">
                  <label className="flex justify-center items-center cursor-pointer">
                    <input
                      type="file"
                      hidden
                      ref={myImg}
                      onChange={handlePostImage}
                      accept="image/*"
                    />
                    <CiImageOn className="text-blue-700 mr-2" size={24} />
                    Photo
                  </label>
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" isLoading={isPending}  onPress={mutate}>
                  {!isPending && 
                    <span>Save</span>
                  }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
