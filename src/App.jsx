

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MainRouter from './components/router/MainRouter';
import { ToastProvider, HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./useContext/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SessionExpired from "./components/SessionExpired"; 
import NetworkStatus from "./components/NetworkStatus"; 

function App() {
  const queryClientConfig = new QueryClient();
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
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
      
      <NetworkStatus />

      <SessionExpired isOpen={isSessionExpired} />
    </QueryClientProvider>
  );
}

export default App;