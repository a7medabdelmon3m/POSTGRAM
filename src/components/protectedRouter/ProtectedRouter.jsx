import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../../useContext/authContext'


export default function ProtectedRouter({children}) {
   const {userToken}  =  useContext(authContext)
  // const userToken = localStorage.getItem('postGramTkn') ;
   if(userToken === null){
    return <Navigate to='/login'></Navigate>
   }
  return (
    <>
        {children}
    </>
   
  )
}
