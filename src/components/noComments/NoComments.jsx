import React from 'react';
import { BiMessageRoundedDots } from "react-icons/bi"; 

export default function NoComments() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="bg-gray-50 p-4 rounded-full mb-3">
        <BiMessageRoundedDots size={40} className="text-gray-300" />
      </div>
      
      <h3 className="text-gray-500 font-medium text-sm">
        No comments yet
      </h3>
      <p className="text-gray-400 text-xs mt-1">
        Be the first one to share what you think!
      </p>
    </div>
  );
}