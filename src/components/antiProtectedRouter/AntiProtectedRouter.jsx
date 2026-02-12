import React, { useContext } from 'react'
import { authContext } from '../../useContext/authContext'
import { Navigate } from 'react-router-dom'

export default function AntiProtectedRouter({children}) {
   const {userToken} =  useContext(authContext)
   if(userToken !== null){
     return <Navigate to='/home'></Navigate>
   }
  return (
    <div>{children}</div>
  )
}
