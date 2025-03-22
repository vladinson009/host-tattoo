import postService from "../../services/postService";
import PostComponent from "./PostComponent";

async function fetchPosts(setPost, _id, signal) {
    const fetchPosts = await postService.getPosts(signal);
    const updatedArtists = fetchPosts.map((post) => {
        return { ...post, isLiked: post?.likes?.includes(_id) };
    });
    setPost(updatedArtists);
}

export default function NewsFeed() {

    // show all posts in News Feed section
    return (<PostComponent fetchPosts={fetchPosts} title="News Feed" />);
}