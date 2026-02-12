import React from 'react'
import Navbar from '../navBar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <Navbar/>
    <div className='bg-linear-to-b from-[#589FC7] to-[#00644E]  min-h-screen '>
      
      <Outlet/>
    </div>
    <footer className='bg-black text-white text-center'>
        footer
        footer
        footer
      </footer>
      </>
)}
