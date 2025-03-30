import { useContext } from "react";
import Spinner from "../partials/Spinner";
import PostCard from "./postCard";
import context from "../../context/context";
import NoContent from "../partials/NoContent";
import Toast from "../partials/Toast";


export default function PostComponent({ data, error, isLoading, title }) {
    const { userSession, globalMessage } = useContext(context);

    if (isLoading) { return <Spinner /> };
    if (data?.length < 1) { return (<NoContent content="No posts yet..." />) };
    return (
        <>
            {globalMessage && <Toast message={globalMessage} type="message" />}
            {error && <Toast message={error} />}
            <div className="min-h-[calc(100vh-4rem-4rem)] flex flex-col items-center justify-center text-white text-center p-6">
                <div className="max-w-2xl mx-auto py-8 space-y-6 pt-20">
                    <h2 className="text-4xl font-black mb-6 drop-shadow-lg text-center">{title}</h2>
                    {data?.map((post) => (
                        <PostCard key={post.objectId} post={post} userSession={userSession} />
                    ))
                    }
                </div>
            </div>
        </>
    );
};


