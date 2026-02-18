
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FcBearish } from "react-icons/fc";
import './App.css'
import MainRouter from './components/router/MainRouter';
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AuthContextProvider from "./useContext/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
 
const queryClientConfig = new QueryClient()

  return (
    <QueryClientProvider client={queryClientConfig}>
      <AuthContextProvider>
        <HeroUIProvider>
                <ToastProvider />
            <MainRouter />
        </HeroUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>

    
    
  )
}

export default App
