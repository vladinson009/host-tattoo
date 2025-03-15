import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import postApi from "../../api/postApi";
import context from "../../context/context";

export default function NewsFeed() {
    const { userSession } = useContext(context)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const controller = new AbortController()
        postApi.getPosts(10, 0, controller.signal).then((setPosts)).catch(err => {
            if (err.name != 'AbortError') {
                console.log(err);
            }
        })
        return () => {
            return controller.abort()
        }
    }, [])
    return (
        <div className="opacity-75 min-h-[calc(100vh-4rem-4rem)] flex flex-col items-center justify-center text-red-600 text-center p-6">


            <div className="max-w-2xl mx-auto py-8 space-y-6 pt-20">
                {/* <h2 className="text-3xl font-bold text-black mb-8">News feed</h2> */}
                {posts.map((post) => (
                    <motion.div
                        key={post.objectId}
                        className="bg-[rgba(31,41,55,0.8)] p-4 rounded-2xl shadow-lg border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >

                        <div className="flex items-center space-x-4">
                            <div>
                                <img src={post.image.url} alt={post.title} className="rounded-full" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-3xl sm:text-4xl md:text-6xl">{post.title}</h3>
                                <p className="text-1xl sm:text-2xl md:text-3xl text-gray-400">
                                    {formatDistanceToNow(new Date(post.createdAt))} ago
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4"></div>
                        {/* //TODO Comments: */}
                        <p className="text-white mt-2">Posted by: <span className="text-red-600 text-4xl sm:text-5xl md:text-6xl">{post.owner}</span></p>
                        <div className="mt-4 text-gray-300">
                            <p className="leading-8 sm:leading-9 md:leading-10 text-2xl sm:text-3xl md:text-4xl">{post.description}</p>
                        </div>
                        {userSession && <div className="flex space-x-4 items-center justify-evenly mt-4">
                            <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-red-500">
                                {post.liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
                            </button>
                            <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-blue-200">
                                <FaComment />
                            </button>
                        </div>}
                    </motion.div>
                ))
                }
            </div>
        </div>
    );
};


