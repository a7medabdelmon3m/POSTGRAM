import { useState, useEffect } from "react";
import { MdSignalWifiConnectedNoInternet4 } from "react-icons/md";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-gray-900/95 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-sm sm:px-6 animate-appearance-in">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
        <MdSignalWifiConnectedNoInternet4 size={18} className="text-red-500" />
      </span>
      <span className="tracking-wide">You are currently offline</span>
    </div>
  );
}