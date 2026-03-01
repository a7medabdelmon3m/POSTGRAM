// import axios from "axios";
import Post from "../postCard/Post";
import { FaLessThan } from "react-icons/fa6";
import Loading from "../loading/Loading";
import { BiErrorCircle } from "react-icons/bi";
// import { useQuery } from "@tanstack/react-query";
import PostCreation from "../postCreation/PostCreation";
import { Helmet } from "react-helmet";
import useHome from "./useHome";

export default function Home() {
  // const [allPosts, setAllPosts] = useState(null);
  // const [isLoading, setisLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // function getAllPosts() {
  //   setIsError(false);
  //   setisLoading(true);
  //   axios
  //     .get("https://linked-posts.routemisr.com/posts?sort=-createdAt", {
  //       headers: { token: localStorage.getItem("postGramTkn") },
  //     })
  //     .then(function (resp) {
  //       console.log("response : => ", resp.data.posts);

  //       setAllPosts(resp.data.posts);
  //     })
  //     .catch(function (error) {
  //       console.log("error : => ", error);
  //       setIsError(true);
  //     })
  //     .finally(function () {
  //       setisLoading(false);
  //     });
  // }
  // useEffect(function () {
  //   getAllPosts();
  // }, []);
 
 const {allPosts, isLoading , isError ,getAllPosts} = useHome()
  if (isLoading) {
    return <Loading />;
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
            onClick={getAllPosts}
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors"
          >
            Try Again
          </button>
        </div>
        ;
      </div>
    );
  }
  // console.log(data.data.data.posts);

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title> postgram</title>
      </Helmet>
      <PostCreation />
      {allPosts?.map((post) => (
        <Post
          key={post._id}
          post={post}
          isPostDetails={false}
          queryKey={["getPosts"]}
        />
      ))}
    </div>
  );
}
