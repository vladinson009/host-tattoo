
import PostComponent from "../post/PostComponent";
import postService from '../../services/postService';

async function fetchOwnPosts(setPost, _id, signal) {
    const posts = await postService.getOwnPosts(signal);
    const updatedPosts = posts.map((post) => {
        return { ...post, isLiked: post?.likes?.includes(_id) };
    });
    setPost(updatedPosts);
}
export default function MyPosts() {
    return <PostComponent fetchPosts={fetchOwnPosts} title="My posts" />
}