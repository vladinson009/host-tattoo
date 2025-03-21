import { useContext, useEffect, useRef, useState } from "react";
import postService from "../services/postService";
import context from "../context/context";

export default function useCommentModal(setCommentsCount, post, isOpen) {
    const { tempMessage } = useContext(context)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const modalRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [isPending, setIsPending] = useState(false);

    // Handle mouse down event
    function handleMouseDown(e) {
        setDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    // Handle mouse move event
    function handleMouseMove(e) {
        if (!dragging) return;
        setPosition({
            x: e.clientX - startPosition.x,
            y: e.clientY - startPosition.y,
        });
    };

    // Handle mouse up event
    function handleMouseUp() {
        setDragging(false);
    };


    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const retrievedComments = await postService.retrieveComments(post.objectId, controller.signal);
            setComments(retrievedComments)
            setCommentsCount(retrievedComments.length)

        })()

        return () => controller.abort();
    }, [post.objectId, setCommentsCount])

    async function onAddComment() {
        if (newComment.trim() == "") {
            return
        }
        try {
            setIsPending(true);
            await postService.createComment(post.objectId, newComment);
            const retrievedComments = await postService.retrieveComments(post.objectId)
            setComments(retrievedComments);
            setCommentsCount(retrievedComments.length)
            setNewComment('');
            setIsPending(false);
            tempMessage("Comment added!")

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isOpen]);

    return {
        handleMouseMove,
        handleMouseUp,
        handleMouseDown,
        modalRef,
        position,
        comments,
        newComment,
        setNewComment,
        onAddComment,
        isPending

    }
}