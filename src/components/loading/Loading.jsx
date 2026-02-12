import React from 'react'
import { HashLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <HashLoader color="#F7BA1C" />
    </div>
  )
}
