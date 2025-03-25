import { useQuery, useQueryClient } from "@tanstack/react-query";
import postService from "../../services/postService";
import PostComponent from "./PostComponent";
import { useContext } from "react";
import context from "../../context/context";


export default function NewsFeed() {
    const queryClient = useQueryClient();
    const { userSession } = useContext(context);

    const { data, error, isLoading } = useQuery({
        queryKey: ['fetchPosts'],
        queryFn: async () => {
            const result = await postService.getPosts();
            const updatedArtists = result.map((post) => {
                return { ...post, isLiked: post?.likes?.includes(userSession?._id) };
            });
            return updatedArtists;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['fetchPosts'], data);
        }, onError: (error) => {
            console.log(error);
        }
    })
    return (<PostComponent data={data} error={error} isLoading={isLoading} title="News Feed" />);
}