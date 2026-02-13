import React from 'react'
import Post from '../postCard/Post'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import Loading from '../loading/Loading';



export default function PostDetails() {

    const {id} =  useParams() ; 
function getPostById(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}` ,{
        headers:{
            token :localStorage.getItem("postGramTkn")
        }
    })
}
    const {data , isLoading , isError , error} = useQuery({
        queryKey: ['getPostById' ,id],
        queryFn:getPostById,
    })

    if (isLoading) {
        return <Loading />;
      }
      if (isError) {
        return (
          <div className=" min-h-screen flex  items-center justify-center">
            <div className=" flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-red-50 p-4 rounded-full mb-4">
                <BiErrorCircle size={50} className="text-red-500" />
              </div>
    
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                We couldn't retrieve the posts at the moment. Please check your
                connection or try again later.
              </p>
    
              <button
                onClick={postDetails}
                className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors"
              >
                Try Again
              </button>
            </div>
            ;
          </div>
        );
      }
      const postDetails = data.data.post;
      
      return (
        <div className='min-h-screen pt-6'> 
            <Post post={postDetails} isPostDetails ></Post>
        </div>
      )
}
