import React, { useContext, useState } from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import MyNavbar from "../navbar/Navbar";
import { FollowSuggestions } from "../ui/FollowSuggestions";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authContext } from "../../useContext/authContext";

export default function MainLayout() {
  const queryClient = useQueryClient();
  const { userToken } = useContext(authContext);
  const isUserLogin = !!userToken;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  function getFollowSuggestion() {
    return axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=20`,
      {
        headers: {
          token: localStorage.getItem("postGramTkn"),
        },
      },
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: getFollowSuggestion,
    queryKey: ["getFollowSuggestion"],
    enabled: !!localStorage.getItem("postGramTkn"),
  });

  const suggestionsList = data?.data?.data?.suggestions || [];

  const { isSuccess, mutate, variables, isPending } = useMutation({
    mutationFn: (userId) => {
      return axios.put(
        `https://route-posts.routemisr.com/users/${userId}/follow`,
        {},
        {
          headers: {
            token: localStorage.getItem("postGramTkn"),
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getFollowSuggestion"] });
      queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
    },
  });

  const validRoutes = [
    "/",
    "/home",
    "/postDetails/:id",
    "/saved-posts",
    "/userProfile/:id",
    "/profile",
    "/setting",
    "/dashboard",
    "/register",
    "/login",
  ];

  const isValidRoute = validRoutes.some((route) =>
    matchPath({ path: route, exact: true }, location.pathname),
  );

  const isNotFoundPage = !isValidRoute;
  const shouldShowSidebar = isUserLogin && !isNotFoundPage;

  return (
    <div className="bg-[#D6D6D4] min-h-screen">
      <MyNavbar />

      <div
        className={`max-w-7xl mx-auto p-4 gap-6 grid grid-cols-1 ${
          shouldShowSidebar ? "xl:grid-cols-4" : "grid-cols-1"
        }`}
      >
        <main
          className={`col-span-1 ${
            shouldShowSidebar ? "xl:col-span-3" : "col-span-1"
          } w-full`}
        >
          {/* زرار الموبايل والشاشات المتوسطة/الكبيرة يظهر عشان يفتح المنيو جانبي */}
          {shouldShowSidebar && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden w-full mb-4 bg-[#00644E] text-white dark:bg-white dark:text-slate-900 py-2.5 rounded-xl font-bold text-sm shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              Show Follow Suggestions
            </button>
          )}

          <Outlet />
        </main>

        {shouldShowSidebar && (
          <>
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 bg-black/60 z-30 xl:hidden backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <aside
              className={`
                fixed right-0 w-72 sm:w-[320px] p-4 z-40 transition-transform duration-300 ease-in-out bg-[#D6D6D4] dark:bg-slate-900 
                top-16 h-[calc(100vh-4rem)] overflow-hidden
                ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"}
                
                xl:sticky xl:top-20 xl:self-start xl:translate-x-0 xl:w-auto xl:h-[calc(100vh-6rem)] xl:p-0 xl:z-auto xl:block xl:col-span-1 xl:shadow-none xl:bg-transparent
              `}
            >
              <div className="h-full overflow-hidden flex flex-col">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="xl:hidden mb-4 w-full bg-white text-slate-900 py-2 rounded-xl font-bold text-sm shadow-sm shrink-0"
                >
                  Close ✕
                </button>

                <FollowSuggestions>
                  <FollowSuggestions.Header title="Who to follow" />

                  <FollowSuggestions.List>
                    {isLoading && (
                      <p className="text-xs text-slate-500 animate-pulse text-center py-4">
                        Loading suggestions...
                      </p>
                    )}

                    {isError && (
                      <p className="text-xs text-red-500 text-center py-4">
                        Failed to load suggestions.
                      </p>
                    )}

                    {!isLoading &&
                      !isError &&
                      suggestionsList.map((user) => (
                        <FollowSuggestions.Card
                          key={user._id}
                          user={user}
                          onFollow={() => mutate(user._id)}
                          isPending={variables === user._id && isPending}
                          isSuccess={variables === user._id && isSuccess}
                        />
                      ))}
                  </FollowSuggestions.List>
                </FollowSuggestions>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
