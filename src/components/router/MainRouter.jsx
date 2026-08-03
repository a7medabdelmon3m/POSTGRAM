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
import PostDetails from "../postDetails/PostDetails";
import Setting from "../setting/Setting";
import SavedPostsPage from "../savedPosts/savedPosts";
import UserProfile from "../userProfile/UserProfile";
import NotFound from "../notFound/NotFound";

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
        path: "saved-posts",
        element: (
          <ProtectedRouter>
            <SavedPostsPage />
          </ProtectedRouter>
        ),
      },
      {
        path: "postDetails/:id",
        element: (
          <ProtectedRouter>
            <PostDetails />
          </ProtectedRouter>
        ),
      },
      {
        path: "userProfile/:id",
        element: (
          <ProtectedRouter>
            <UserProfile />
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
        path: "setting",
        element: (
          <ProtectedRouter>
            <Setting />
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
          <NotFound/>
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
