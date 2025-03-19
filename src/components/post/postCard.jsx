// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { onLike, onUnlike, onPostLikes } from './postUtils'
import { useState } from "react";
import CommentModal from "./CommentModal";
export default function PostCard({ post, setPost, userSession }) {
    const [commentsCount, setCommentsCount] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
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
                    <h3 className="text-white font-bold text-2xl sm:text-2xl md:text-4xl">{post.title}</h3>
                    <p className="text-1xl sm:text-1xl md:text-1xl text-gray-400">
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4"></div>
            {/* //TODO Comments: */}
            <p className="text-white mt-2">Posted by: <span className="text-red-600 text-1xl sm:text-2xl md:text-3xl">{post.owner}</span></p>
            <div className="mt-4 text-gray-300">
                <p className="leading-8 sm:leading-9 md:leading-10 text-1xl sm:text-1xl md:text-2xl">{post.description}</p>
            </div>
            {userSession && <div className="flex space-x-4 items-center justify-evenly mt-4">
                <div>
                    <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-red-500">
                        {post.isLiked
                            ? <FaHeart onClick={onUnlike.bind(post, setPost)} className="text-red-600" />
                            : <FaRegHeart onClick={onLike.bind(post, setPost)} />}
                    </button>
                    <span onClick={onPostLikes.bind(post)} className="text-xl sm:text-2xl md:text-3xl text-gray-300 cursor-pointer hover:text-red-700 block"> {post?.likes?.length > 0 ? post?.likes?.length + " Likes" : "No likes yet"}</span>
                </div>
                <div >

                    <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-blue-200">
                        <FaComment onClick={() => setIsModalOpen(true)} />
                    </button>
                    <span onClick={onPostLikes.bind(post)} className="text-xl sm:text-2xl md:text-3xl text-gray-300 cursor-pointer hover:text-red-700 block">{commentsCount > 0 ? commentsCount + " Comments" : "No comments yet"}</span>

                </div>
            </div>}
            <CommentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                post={post}
                setCommentsCount={setCommentsCount}
            />
        </motion.div>
    )
}