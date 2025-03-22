// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";

// import { onUnlike, } from './postUtils'
import CommentModal from "../modals/CommentModal";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import usePostCard from "../../hooks/usePostCard";

export default function PostCard({ post, setPost, userSession }) {
    const [commentsCount, setCommentsCount] = useState(0)
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { isOwner, isPending, onEdit, onDelete, onLike, onUnlike } = usePostCard(post, setPost, userSession)


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
                    <h3 className="text-white text-2xl sm:text-2xl md:text-4xl">{post.title}</h3>
                    <p className="text-1xl sm:text-1xl md:text-1xl text-gray-400">
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4"></div>
            <p className="text-white mt-2">Posted by: <span className="text-red-600 text-1xl sm:text-2xl md:text-3xl">{post.owner}</span></p>
            <div className="mt-4 text-gray-300">
                <p className="leading-8 sm:leading-9 md:leading-10 text-1xl sm:text-1xl md:text-2xl">{post.description}</p>
            </div>
            {userSession && <div className="flex space-x-4 items-center justify-evenly mt-4">
                <div>
                    <button disabled={isPending} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-red-500">
                        {
                            // isPending ? <FaSpinner className="text-4xl animate-spin" /> :
                            post.isLiked
                                ? <FaHeart onClick={onUnlike.bind(post)} className={`text-red-600 ${isPending && "animate-ping"}`} />
                                : <FaRegHeart onClick={onLike.bind(post)} className={isPending && "animate-ping"} />
                        }
                    </button>
                    <span className="text-xl sm:text-2xl md:text-3xl text-gray-300 block"> {post?.likes?.length > 0 ? post?.likes?.length + " Likes" : "No likes yet"}</span>
                </div>
                <div >
                    <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-blue-200">
                        <FaComment onClick={() => setIsCommentModalOpen(true)} />
                    </button>
                    <span className="text-xl sm:text-2xl md:text-3xl text-gray-300 block">{commentsCount > 0 ? commentsCount + " Comments" : "No comments yet"}</span>

                </div>
                {isOwner
                    && <>
                        <div>
                            <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-red-500">
                                <MdEdit onClick={() => setIsEditModalOpen(true)} />
                            </button>
                            <span className="text-xl sm:text-2xl md:text-3xl text-gray-300 block">Edit</span>
                        </div>
                        <div>
                            <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 cursor-pointer hover:text-red-500">
                                <MdDeleteForever onClick={() => setIsDeleteModalOpen(true)} />
                            </button>
                            <span className="text-xl sm:text-2xl md:text-3xl text-gray-300 block">Delete</span>
                        </div>
                    </>}
            </div>}
            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                post={post}
                setCommentsCount={setCommentsCount}

            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={onDelete.bind(post)}
                title={post.title} />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={onEdit.bind(post)}
                initialTitle={post.title}
                initialDescription={post.description}
            />
        </motion.div>
    )
}