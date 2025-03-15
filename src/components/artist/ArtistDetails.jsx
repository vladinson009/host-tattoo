import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { onLike, onUnlike } from "./artistUtils";
import artistApi from "../../api/artistApi";
import context from "../../context/context";
import galleryApi from "../../api/galleryApi";
import TattooCard from "../partials/TattooCard";

export default function ArtistDetails() {
    const { userSession } = useContext(context);
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [tattoo, setTattoo] = useState([]);
    useEffect(() => {
        (async function fetchArtist() {
            const data = await artistApi.getArtistById(artistId)
            const fetchTattoo = await galleryApi.getTattoosByArtistId(artistId);

            setArtist(data);
            setTattoo(fetchTattoo);
        })()
    }, [artistId]);

    if (!artist) return <div className="text-white text-center mt-20">Loading...</div>;

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tattoo.map(t => <TattooCard key={t.objectId} post={t} />)}
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg mt-5">No tattoos uploaded yet.</p>
                )}
            </div>

        </div>
    );
}
