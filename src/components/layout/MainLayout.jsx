import React from 'react'
import { Outlet } from 'react-router-dom'
import MyNavbar from '../navbar/Navbar'
export default function MainLayout() {
  return (
    <>
      <MyNavbar/>
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
