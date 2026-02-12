import React from 'react'
import CardHeader from '../cardHeader/CardHeader'

export default function Comment({commentDetails}) {
  return (
    <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-4 border-[#589fc7]">
                  <div className="">
                    <CardHeader
                      user={commentDetails?.commentCreator}
                      date={commentDetails?.createdAt}
                      commentContent = {commentDetails?.content}
                      cat = {'comment'}
                    ></CardHeader>
                  </div>
                </div>
  )
}
