import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useShare(postId , onShareSuccess) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (content) => {
      return axios.post(
        `https://route-posts.routemisr.com/posts/${postId}/share`,
        { body: content },
        {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
          },
        },
      );
    },
    onError: (error) => {
      addToast({
        title: "opps!",
        description: error.response.message || 'Post shared successfully!',
        color: "danger",
        timeout: "1500",
      });
      onShareSuccess()
    },
    onSuccess: (resp) => {
      addToast({
        title: "congratulations",
        description: resp.data.message || 'Failed to share post',
        color: "success",
        timeout: "1500",
      });
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      if (onShareSuccess) onShareSuccess();
    },
  });

  return { sharePost: mutation.mutate, isLoading: mutation.isPending };
}
