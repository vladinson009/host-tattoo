import { Fragment } from "react";
import useCommentModal from "../../../hooks/useCommentModal";
import SubmitFormButton from "../../partials/form/SubmitFormButton";
import { formatDistanceToNow } from "date-fns";

export default function CommentModal({ isOpen, onClose, post, setCommentsCount }) {
    const { handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        modalRef,
        position,
        comments,
        newComment,
        setNewComment,
        onAddComment

    } = useCommentModal(setCommentsCount, post, isOpen)
    if (!isOpen) return null;
    return (
        <div onClick={onClose}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()} // Prevent background click from closing modal
                onMouseDown={handleMouseDown} // Start dragging
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                className="bg-gray-900 border border-gray-400 text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px] relative cursor-move"

            >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-500"
                >
                    &times;
                </button>

                {/* Modal Header */}
                <h2 className="text-2xl  mb-4 text-center">Comments</h2>

                {/* Comment List */}
                <div className="max-h-100 overflow-y-auto h-100 mb-4">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <Fragment key={comment.objectId} >
                                <div className="mb-2 p-2 bg-gray-800 rounded-lg">
                                    <p className="text-gray-300 text-1xl sm:text-1xl md:text-2xl">{comment.comment}</p>
                                </div>
                                <div className="pb-15">
                                    <p className="text-gray-300">By: <span className="text-red-600 text-1xl sm:text-1xl md:text-2xl"> {comment.ownerName}</span></p>
                                    <p className="text-sm sm:text-sm md:text-md text-gray-400">
                                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                                    </p>
                                </div>
                            </Fragment>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center text-2xl">No comments yet.</p>
                    )}
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none text-2xl"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />

                    <SubmitFormButton clickHandler={onAddComment} textContent="Post new comment" />
                </div>
            </div>
        </div>
    );
}
