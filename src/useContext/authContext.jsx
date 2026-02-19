import React, { createContext, useEffect, useState } from 'react'

export const authContext =  createContext() ; 

export default function AuthContextProvider({children}) {
    // laszy initialization 
    const [userToken, setUserToken] = useState(function(){
        return localStorage.getItem('postGramTkn') ; 
    })
    const [user, setUser] = useState(
        function(){
        return JSON.parse( localStorage.getItem('userData')) ; }
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

    
  return (
    <authContext.Provider value={{userToken , setAuthContextToken , clearAuthContextToken , user , setUser}}>
        {children}
    </authContext.Provider>
    
  )
}
