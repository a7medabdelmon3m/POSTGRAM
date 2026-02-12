import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../home/Home";
import Register from "../register/Register";
import Login from "../login/Login";

import Profile from "../profile/Profile";
import Dashboard from "../dashboard/Dashboard";
import AntiProtectedRouter from "../antiProtectedRouter/AntiProtectedRouter";
import ProtectedRouter from "../protectedRouter/ProtectedRouter";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRouter>
            <Dashboard />
          </ProtectedRouter>
        ),
      },
      {
        path: "register",
        element: (
          <AntiProtectedRouter>
            <Register />
          </AntiProtectedRouter>
        ),
      },
      { path: "login", element:
        <AntiProtectedRouter>
            <Login />
        </AntiProtectedRouter>
         },
      {
        path: "*",
        element: (
          <>
            <div className="h-full bg-red-500 text-blue-700 text-center"></div>
            404
          </>
        ),
      },
    ],
  },
]);
export default function MainRouter() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
