import { Helmet } from "react-helmet";
import { CgMail } from "react-icons/cg";
import { FaUserGroup, FaBookmark, FaImage, FaCamera } from "react-icons/fa6";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import { BiErrorCircle } from "react-icons/bi";
import UploadProfileImage from "../uplaodProfileImage/UploadProfileImage";
import { Avatar } from "@heroui/react";
import Post from "../postCard/Post";
import useProfilePosts from "./getMyPosts/useProfilePosts";
import { useContext } from "react";
import { authContext } from "../../useContext/authContext";
import { SyncLoader } from "react-spinners";

export default function Profile() {
  const { userData } = useContext(authContext);
  const { allPosts, isPendingPosts } = useProfilePosts(userData?.user);

  function handleGetProfile() {
    return axios.get("https://route-posts.routemisr.com/users/profile-data", {
      headers: {
        AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
      },
    });
  }
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: handleGetProfile,
    queryKey: ["getProfile"],
    enabled: !!localStorage.getItem("postGramTkn"),
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return (
      <div className=" min-h-screen flex  items-center justify-center">
        <div className=" flex flex-col items-center justify-center py-12 px-4 text-center max-w-117.5 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <BiErrorCircle size={50} className="text-red-500" />
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-1">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            We couldn't retrieve the posts at the moment. Please check your
            connection or try again later.
          </p>

          <button
            onClick={refetch}
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors"
          >
            Try Again
          </button>
        </div>
        ;
      </div>
    );
  }
  const profileData = data?.data?.data;
  // console.log(profileData);

  return (
    <div className="min-h-screen  bg-gray-50 py-10 px-4 flex flex-col justify-center items-center font-sans">
      <Helmet>
        <title>Profile | {profileData.user.name}</title>
      </Helmet>

      <div className="w-full max-w-3xl bg-white rounded-4xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-48 md:h-56 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 relative"></div>

        <div className="px-6 md:px-10 pb-10 relative">
          <div className="absolute -top-16 left-6 md:left-10 z-10">
            <div className="relative p-1.5 bg-white rounded-full shadow-md inline-block">
              <Avatar
                isBordered
                color="primary"
                className="w-32 h-32 text-large"
                src={profileData.user.photo}
              />

              <UploadProfileImage />
            </div>
          </div>

          <div className="pt-20"></div>

          <div className="mt-2">
            <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {profileData.user.name}
            </h4>
            <h5 className="text-md font-medium text-gray-500 mt-1">
              @{profileData.user.username}
            </h5>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 py-6 border-y border-gray-100">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.user.followersCount}
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Followers
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.user.followingCount}
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Following
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.user.bookmarksCount}
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-1">
                Bookmarks
              </p>
            </div>
          </div>

          <div className="mt-8 bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">About</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center text-gray-600 hover:text-primary transition-colors">
                <CgMail size={20} className="text-blue-500" />
                <span className="font-medium">{profileData.user.email}</span>
              </div>
              <div className="flex gap-3 items-center text-gray-600 hover:text-primary transition-colors">
                <FaUserGroup size={18} className="text-indigo-500" />
                <span className="font-medium">Active on Postgram</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between cursor-pointer">
              <div>
                <h2 className="text-gray-500 font-medium mb-1">My Posts</h2>
                <p className="text-3xl font-bold text-gray-800">24</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                <FaImage size={24} className="text-blue-600" />
              </div>
            </div>

            <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between cursor-pointer">
              <div>
                <h2 className="text-gray-500 font-medium mb-1">Saved Posts</h2>
                <p className="text-3xl font-bold text-gray-800">12</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-full group-hover:bg-purple-100 transition-colors">
                <FaBookmark size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto py-8">
        {isPendingPosts ? (
          <div className="flex justify-center">
            <SyncLoader color="#F7BF2D" size={10} />
          </div>
        ) : (
          allPosts?.map((post) => (
            <Post
              key={post._id}
              post={post}
              isPostDetails={false}
              queryKey={["getPosts"]}
            />
          ))
          // شيلنا القوس } اللي كان هنا
        )}
      </div>
    </div>
  );
}
