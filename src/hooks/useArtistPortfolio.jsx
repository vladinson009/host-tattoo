import { useContext, useEffect, useState } from "react";
import artistService from "../services/artistService";
import galleryService from "../services/galleryService";
import context from "../context/context";

export default function useArtistPortfolio(artistId) {
    const { userSession } = useContext(context);
    const [artist, setArtist] = useState(null);
    const [tattoo, setTattoo] = useState([]);
    useEffect(() => {
        if (artistId == null) {
            return
        }
        const controller = new AbortController();
        (async function fetchArtist() {

            const [data, fetchTattoo, wishlist] = await Promise.all([
                artistService.getArtistById(artistId, controller.signal),
                galleryService.getTattoosByArtistId(artistId),
                galleryService.retrieveWishlist(userSession?._id, controller.signal)
            ])
            const updatedGallery = fetchTattoo.map((tattoo) => {

                return {
                    ...tattoo,
                    isWishlist: wishlist?.some((el) => el.objectId == tattoo.objectId),
                };
            });
            setArtist(data);
            setTattoo(updatedGallery);
        })()
        return () => controller.abort();
    }, [artistId, userSession?._id]);

    return { artist, tattoo, setTattoo }
}