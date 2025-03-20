import { useContext, useRef, useState } from "react";

import useFetchData from "../../hooks/useFetchData";
import Spinner from "../partials/Spinner";
import PostCard from "./postCard";
import context from "../../context/context";
import NoContent from "../partials/NoContent";
import Toast from "../partials/Toast";


export default function PostComponent({ fetchPosts, title }) {
    const { userSession, globalMessage } = useContext(context);
    const [posts, setPosts] = useState([]);
    const { isLoading, error } = useFetchData(fetchPosts, setPosts, userSession?._id)
    const observerRef = useRef(null);

    if (isLoading) { return <Spinner /> };
    if (posts.length < 1) { return (<NoContent content="No posts yet..." />) };
    return (
        <>
            {globalMessage && <Toast message={globalMessage} type="message" />}
            {error && <Toast message={error} />}
            <div className="min-h-[calc(100vh-4rem-4rem)] flex flex-col items-center justify-center text-red-600 text-center p-6">
                <div className="max-w-2xl mx-auto py-8 space-y-6 pt-20">
                    <h2 className="text-4xl font-black mb-6 drop-shadow-lg text-center">{title}</h2>
                    {posts.map((post) => (
                        <PostCard key={post.objectId} post={post} setPost={setPosts} userSession={userSession} />
                    ))
                    }
                </div>
                <div ref={observerRef} className="h-10"></div>
            </div>
        </>
    );
};


