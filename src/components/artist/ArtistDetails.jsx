import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import artistService from "../../services/artistService";
import galleryService from "../../services/galleryService";
import TattooCard from "../gallery/TattooCard";
import context from "../../context/context";
import Spinner from "../partials/Spinner";

export default function ArtistDetails() {
    const { userSession } = useContext(context);
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [tattoo, setTattoo] = useState([]);
    useEffect(() => {
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
                    isWishlist: wishlist?.some((el) => el.tattooId.objectId == tattoo.objectId),
                };
            });
            setArtist(data);
            setTattoo(updatedGallery);
        })()
        return () => controller.abort();
    }, [artistId]);

    if (!artist) return <Spinner />;
    return (
        <div className="max-w-6xl mx-auto px-4 py-22 ">
            {/* Artist Info */}
            <div className="bg-[rgba(31,41,55,0.98)] p-6 rounded-xl shadow-lg border border-red-800 flex flex-col md:flex-row items-center">
                <img
                    src={artist.image}
                    alt={artist.username}
                    className="w-48 h-48 rounded-full border-4 border-red-800 object-cover"
                />
                <div className="ml-6 flex-1 text-center md:text-left">
                    <h1 className="text-red-600 font-bold text-5xl">{artist.name}</h1>
                    <p className="text-gray-400 mt-6 text-2xl sm:text-3xl md:text-4">{artist.description}</p>
                </div>
            </div>

            {/* Artist's Work Gallery */}
            <div className="mt-10">
                <h2 className="text-white text-3xl font-bold mb-5">Tattoo Portfolio</h2>
                {tattoo.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                        {tattoo.map(t => <TattooCard key={t.objectId} tattoo={t} setTattoos={setTattoo} />)}
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg mt-5">No tattoos uploaded yet.</p>
                )}
            </div>

        </div>
    );
}
