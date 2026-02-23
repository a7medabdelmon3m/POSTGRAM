import {
    addToast,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React, { useContext, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import elwan from '../../assets/images/elwan.png'
import { useRef } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authContext } from "../../useContext/authContext";

export default function UploadProfileImage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imagePreview, setimagePreview] = useState(null);
  const {setUserPhoto , userPhoto} = useContext(authContext)
const queryObj = useQueryClient() ;
  const imgVal =  useRef(null) ; 
    // console.log('userPhoto', userPhoto);
    
  function handleChangeImage(e){
    setimagePreview(URL.createObjectURL(e.target.files[0])) ;
    onOpen() ;
  }
  function handleClearimage(){
    onOpenChange() ; 
    setimagePreview(null) ;
    if(imgVal.current){
        imgVal.current.value = '' ; 
    } 
  }
  function handleUploadImage(){
    const imgUrl = new FormData() ; 

    if(imgVal.current.value){
        imgUrl.append('photo' , imgVal.current.files[0])
    }
    return axios.put('https://route-posts.routemisr.com/users/upload-photo' , imgUrl ,{
         headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`},
    })
  }
  const {isPending ,mutate} = useMutation({
    mutationFn:handleUploadImage,
    onSuccess:(resp) =>{
         addToast({
              title: "congratulations",
              description:resp.data.message,
              color: 'success',
              timeout:'1500'
            })
            handleClearimage() ;
            queryObj.invalidateQueries({queryKey:['getProfile']})
            queryObj.invalidateQueries({queryKey:['getPosts']})
    },
    onError:(error)=>{
         addToast({
                      title: "oops!",
                      description:error.response?.data?.message || 'Sorry, an error occurred during uploading',
                      color: 'danger',
                      timeout:'1500'
                    })
    },
    onSettled:()=>{

    }

  })
  return (
    <div>
      <label
        className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full border-2 border-white hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer shadow-lg"
        title="change image of profile"
      >
        <input ref={imgVal} onChange={handleChangeImage}  type="file" hidden />
        <FaCamera size={16} />
      </label>
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex font-semibold items-center  flex-col gap-1">
                 Upload Profile Photo
                </ModalHeader>
                <ModalBody>
                  <img
                    alt="HeroUI hero Image"
                    src={imagePreview ?imagePreview :elwan }
                    
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button onPress={mutate} isLoading={isPending} color="primary" >
                   {
                    !isPending && 
                    <span>save</span> 
                   }
                    
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
