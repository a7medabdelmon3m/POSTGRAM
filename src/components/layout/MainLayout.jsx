import React from 'react'
import { Outlet } from 'react-router-dom'
import MyNavbar from '../navbar/Navbar'
export default function MainLayout() {
  return (
    <>
      <MyNavbar/>
    <div className='bg-[#D6D6D4]     min-h-screen '>
      
      <Outlet/>
    </div>
    
      </>
)}
