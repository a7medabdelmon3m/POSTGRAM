import { useState, useEffect } from 'react';
import axios from 'axios';
import { FcBearish } from "react-icons/fc";
import './App.css';
import MainRouter from './components/router/MainRouter';
import { addToast, HeroUIProvider, ToastProvider } from "@heroui/react";
import AuthContextProvider from "./useContext/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Offline } from "react-detect-offline";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";

import SessionExpired from "./components/SessionExpired"; 

function App() {
  const queryClientConfig = new QueryClient();

  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          setIsSessionExpired(true);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

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
        <div className="p-10 bg-amber-300 text-red-600 flex flex-col items-center justify-center rounded-2xl fixed top-1/2 left-1/2 z-20 -translate-x-1/2">
          <MdSignalWifiConnectedNoInternet4 size={32} color="danger" />
          No Internet Connection
        </div>
      </Offline>

      <SessionExpired isOpen={isSessionExpired} />
    </QueryClientProvider>
  )
}

export default App;