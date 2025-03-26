
import PostComponent from "../post/PostComponent";
import postService from '../../services/postService';
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import context from "../../context/context";

export default function MyPosts() {
    const { userSession } = useContext(context);
    const { data, error, isLoading } = useQuery({
        queryKey: ['myPosts'],
        queryFn: async () => {
            const result = await postService.getOwnPosts();
            const updatedPosts = result.map((post) => {
                return { ...post, isLiked: post?.likes?.includes(userSession?._id) };
            });
            return updatedPosts;
        },
        onSuccess: (data) => {
            QueryClient.invalidateQueries(['myPosts'], data);
        }
    })


    // show only posts of the current user in My Posts section
    return <PostComponent data={data} error={error} isLoading={isLoading} title="My posts" />
}