import { useEffect, useRef, useState } from "react";
import postService from "../services/postService";

export default function useCommentModal(setCommentsCount, post, isOpen) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const modalRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

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
            await postService.createComment(post.objectId, newComment);
            const retrievedComments = await postService.retrieveComments(post.objectId)
            setComments(retrievedComments);
            setCommentsCount(retrievedComments.length)
            setNewComment('');

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (isOpen) {
            // Get the window dimensions
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Calculate center position
            const centerX = (screenWidth / 2) - (modalRef.current?.offsetWidth / 2 || 0);
            const centerY = (screenHeight / 2) - (modalRef.current?.offsetHeight / 2 || 0);

            // Set modal position to the center
            setPosition({ x: centerX, y: centerY });
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
        onAddComment

    }
}