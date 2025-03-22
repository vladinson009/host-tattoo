import { useContext, useEffect, useState } from "react";
import context from "../context/context";
import { useNavigate } from "react-router";
import galleryService from "../services/galleryService";

export default function useDetailsTattooSection(tattooId) {
    const navigate = useNavigate();
    const [tattoo, setTattoo] = useState();
    const { userSession } = useContext(context);

    // fetch tattoo by id and check if it is in user's wishlist
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const [data, wishlistId] = await Promise.all([
                galleryService.getTattooById(tattooId, controller.signal),
                galleryService.retrieveWishlistId(userSession?._id, tattooId)
            ])

            setTattoo({ ...data, isWishlist: wishlistId })
        })()
        return () => controller.abort();
    }, [tattooId, userSession?._id]);

    return { tattoo, navigate, setTattoo }
}