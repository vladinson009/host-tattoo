import { fetchPosts } from "./postUtils";
import PostComponent from "./PostComponent";

export default function NewsFeed() {
    return (<PostComponent fetchPosts={fetchPosts} title="News Feed" />);
}