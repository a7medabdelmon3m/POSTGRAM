import React, { createContext, useEffect, useState } from 'react'

export const authContext =  createContext() ; 

export default function AuthContextProvider({children}) {
    // laszy initialization 
    const [userToken, setUserToken] = useState(function(){
        return localStorage.getItem('postGramTkn') ; 
    })
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

    console.log(userToken);
    
  return (
    <authContext.Provider value={{userToken , setAuthContextToken , clearAuthContextToken}}>
        {children}
    </authContext.Provider>
    
  )
}
