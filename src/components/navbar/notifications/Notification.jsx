// components/Notification/Notification.jsx

export default function Notification({ children }) {
  return (
    <div className="flex flex-col gap-4 max-h-92 overflow-y-auto custom-scrollbar  ">
      {children}
    </div>
  );
}