import { useState } from "react";
import postService from "../services/postService";
import userService from "../services/userService";

export default function usePostCard(post, setPost, userSession) {
    const [isPending, setIsPending] = useState(false);
    const isOwner = post.ownerId && post.ownerId.objectId == userSession?._id

    async function onEdit(title, description) {
        const postId = this.objectId;
        if (!isOwner) {
            throw new Error('You are not an owner of this post!');
        }
        await postService.editPost(postId, { title, description });

        setPost((prevValue) => {
            const newValue = [...prevValue];
            const idx = newValue.findIndex((el) => el.objectId == postId);
            newValue[idx].title = title;
            newValue[idx].description = description;

            return newValue;
        });
    }
    async function onDelete() {
        const postId = this.objectId;
        if (!isOwner) {
            throw new Error('You are not an owner of this post!');
        }
        await postService.deletePost(postId);
        setPost((prevValue) => prevValue.filter((e) => e.objectId !== postId));
    }
    async function onLike() {
        setIsPending(true);
        try {
            const postId = this.objectId;
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await postService.addLikeToPost(postId, currentUserId);
            setPost((prevValue) => refreshPosts(prevValue, likes, postId))
        } catch (error) {
            //TODO error handling
            console.log(error.message);

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
            setPost((prevValue) => refreshPosts(prevValue, likes, postId));

        } catch (error) {
            //TODO error handling
            console.log(error.message);

        } finally {
            setIsPending(false)
        }
    }

    //util function to refresh post Likes
    function refreshPosts(prevValue, likes, postId) {
        const newArtists = prevValue.map((artist) => {
            if (post.objectId === postId) {
                return { ...artist, likes, isLiked: !post.isLiked };
            }
            return post;
        });
        return newArtists;
    }
    return {
        // user interactions with Posts
        onEdit,
        onDelete,
        onLike,
        onUnlike,

        // post state
        isOwner,
        isPending
    }

} 