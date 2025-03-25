import { useState } from "react";
import postService from "../services/postService";
import userService from "../services/userService";
import { useQueryClient } from "@tanstack/react-query";

export default function usePostCard(post, setPost, userSession) {
    const queryClient = useQueryClient();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");
    if (!post) return
    const isOwner = post.ownerId && post.ownerId.objectId == userSession?._id

    async function onEdit(title, description) {
        const postId = this.objectId;
        if (!isOwner) {
            throw new Error('You are not an owner of this post!');
        }
        await postService.editPost(postId, { title, description });

        setPost((prevValue) => {
            const newValue = { ...prevValue, title, description };
            return newValue;
        });
    }
    async function onDelete() {
        const postId = this.objectId;
        if (!isOwner) {
            throw new Error('You are not an owner of this post!');
        }
        await postService.deletePost(postId);
        queryClient.invalidateQueries(['fetchPosts']);
    }
    async function onLike() {
        setIsPending(true);
        try {
            const postId = this.objectId;
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await postService.addLikeToPost(postId, currentUserId);
            setPost((prevValue) => ({ ...prevValue, likes, postId, isLiked: !this.isLiked }))
        } catch (error) {
            setError(error.message);

        } finally {
            setIsPending(false)
        }
    }
    async function onUnlike() {
        setIsPending(true)
        try {
            const postId = this.objectId;
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await postService.removeLikeFromPost(postId, currentUserId);
            setPost((prevValue) => ({ ...prevValue, likes, isLiked: !prevValue.isLiked }));

        } catch (error) {
            setError(error.message);

        } finally {
            setIsPending(false)
        }
    }
    return {
        // user interactions with Posts
        onEdit,
        onDelete,
        onLike,
        onUnlike,

        // post state
        isOwner,
        isPending,
        error
    }

} 