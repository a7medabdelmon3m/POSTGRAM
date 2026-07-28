import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
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

  function getFollowSuggestion() {
    return axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=20`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
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

  const { mutate, variables } = useMutation({
    mutationFn: (userId) => {
      console.log('userId : ' ,userId);
      
      return axios.put(
        `https://route-posts.routemisr.com/users/${userId}/follow`,{},

      {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getFollowSuggestion" ,'getProfile'] });
    },
  });

  return (
    <div className="bg-[#D6D6D4] min-h-screen">
      <MyNavbar />

      <div
        className={`max-w-7xl mx-auto p-4 gap-6 grid grid-cols-1 ${isUserLogin ? "md:grid-cols-4" : "md:grid-cols-1"}`}
      >
        <main
          className={`col-span-1 ${isUserLogin ? "md:col-span-3" : "md:col-span-1"} w-full`}
        >
          {isUserLogin && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-full mb-4 bg-[#00644E] text-white dark:bg-white dark:text-slate-900 py-2.5 rounded-xl font-bold text-sm shadow-sm active:scale-[0.98] transition-all"
            >
              Show Follow Suggestions
            </button>
          )}
          <Outlet />
        </main>

        {isUserLogin && (
          <>
            {isMobileMenuOpen && (
              <div
                className="fixed inset-x-0 bottom-0 top-16 bg-black/60 z-30 md:hidden backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <aside
              className={`
              fixed right-0 w-[280px] sm:w-[320px] p-4 z-40 transition-transform duration-300 ease-in-out bg-[#D6D6D4] md:bg-transparent
              top-16 h-[calc(100vh-4rem)] overflow-y-auto
              ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"}
              md:relative md:top-0 md:translate-x-0 md:w-auto md:h-auto md:p-0 md:z-auto md:block md:col-span-1 md:overflow-visible md:shadow-none
            `}
            >
              <div
                className="md:sticky md:top-24 md:h-[calc(100vh-8rem)] rounded-2xl space-y-4 pb-2 md:overflow-y-auto
                pr-2 
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-track]:bg-slate-200 
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-slate-600 
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-slate-700 
                dark:[&::-webkit-scrollbar-track]:bg-slate-800
                dark:[&::-webkit-scrollbar-thumb]:bg-slate-400
                dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-300"
              >
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="md:hidden mb-4 w-full bg-white text-slate-900 py-2 rounded-xl font-bold text-sm shadow-sm"
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
                          isPending={variables === user._id}
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
