
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FcBearish } from "react-icons/fc";
import './App.css'
import MainRouter from './components/router/MainRouter';
import { addToast, HeroUIProvider, ToastProvider } from "@heroui/react";
import AuthContextProvider from "./useContext/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Offline } from "react-detect-offline";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";

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
      <Offline>
        {/* {
          addToast({
                    title: "Sorry",
                    description:'No Internet Connection',
                    color: 'warning',
                    timeout:'1500'
                  })
        } */}
        <div className="p-10 bg-amber-300 text-red-600 flex flex-col items-center justify-center rounded-2xl fixed top-1/2  left-1/2 z-20 -translate-x-1/2   ">
          <MdSignalWifiConnectedNoInternet4 size={32} color="danger" />
          No Internet Connection
        </div>
      </Offline>
    </QueryClientProvider>

    
    
  )
}

export default App
