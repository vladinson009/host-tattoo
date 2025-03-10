import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import postApi from "../../api/postApi";

export default function NewsFeed() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        postApi.getPosts(10, 0).then((setPosts))
    }, [])
    return (
        <div className=" max-w-2xl mx-auto py-8 space-y-6">
            {posts.map((post) => (
                <motion.div
                    key={post.objectId}
                    className="bg-gray-900 p-4 rounded-2xl shadow-lg border border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4">
                        <div>
                            <img src={post.image.url} alt={post.title} className="rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold">{post.title}</h3>
                            <p className="text-sm text-gray-400">
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </p>
                        </div>
                    </div>
                    {/* <img
                        src={post.image}
                        alt="Tattoo Post"
                        className="w-full h-80 object-cover mt-4 rounded-lg border border-gray-700"
                    /> */}
                    <div className="flex items-center justify-between mt-4">

                    </div>
                    {/* //TODO Comments: */}
                    <p className="text-white mt-2">Posted by: <span className="text-red-600 text-2xl">{post.owner}</span></p>
                    <div className="mt-4 text-gray-300">
                        <p className="leading-7">{post.description}</p>
                    </div>
                    <div className="flex space-x-4 items-center justify-evenly mt-4">
                        <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-red-500">
                            {post.liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                        </button>
                        <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-gray-200">
                            <FaComment />
                        </button>
                    </div>
                </motion.div>
            ))
            }
        </div>
    );
};


