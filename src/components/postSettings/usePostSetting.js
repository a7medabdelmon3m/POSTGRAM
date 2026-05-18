import { addToast } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function usePostSetting(postId) {
const queryClient =useQueryClient()

    function savePost() {
        return axios.put(`https://route-posts.routemisr.com/posts/${postId}/bookmark`, {}, {
            headers: {
                AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`,
            },
        })
    }

    const savePostMutation = useMutation({
        mutationFn: savePost,
        onSuccess: (resp) => {
            addToast({
                title: "Successful Action",
                description: resp.data.message || 'Failed to share post',
                color: "success",
                timeout: "1500",
            })
            queryClient.invalidateQueries({ queryKey: ["getPosts"] });
            queryClient.invalidateQueries({ queryKey: ["getSavedPosts"] });
        }
    })

    return { savePost:savePostMutation.mutate}
}
