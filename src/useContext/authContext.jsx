import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

export const authContext =  createContext() ; 

export default function AuthContextProvider({children}) {
    const [userData, setuserData] = useState(null)
    // laszy initialization 
    const [userToken, setUserToken] = useState(function(){
        return localStorage.getItem('postGramTkn') ; 
    })
    const [user, setUser] = useState(
        function(){
        return localStorage.getItem('userData') ? JSON.parse( localStorage.getItem('userData')) : {}  ; }
    )
    // useEffect(function(){
    //     const tokenVaue = localStorage.getItem('postGramTkn') ; 
    //     if(tokenVaue !== null){
    //         setUserToken(tokenVaue) ; 
    //     }
    // } , [])

    function setAuthContextToken (tkn){
        setUserToken(tkn)
    }
    function clearAuthContextToken(){
        setUserToken(null) 
    } 
      function decodeUserTkn(){
            const decodedTkn = jwtDecode(userToken) ;
            setuserData(decodedTkn); 
            console.log(decodedTkn); 
        }
    useEffect(()=>{
      
        if(userToken){
            decodeUserTkn()
        }
    } ,[userToken]) ;
    
    
  return (
    <authContext.Provider value={{userToken , setAuthContextToken , clearAuthContextToken , user , setUser , userData}}>
        {children}
    </authContext.Provider>
    
  )
}
