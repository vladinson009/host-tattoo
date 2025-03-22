import { Link } from "react-router";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";


export default function ArtistCard({ artist, userSession, onLike, onUnlike }) {
    const [isPending, setIsPending] = useState(false);

    async function onLikeWrapper() {
        setIsPending(true);
        await onLike.bind(artist)();
        setIsPending(false);
    }
    async function onUnlikeWrapper() {
        setIsPending(true);
        await onUnlike.bind(artist)();
        setIsPending(false);
    }
    return (
        <div

            className="relative group w-72 h-full bg-[rgba(31,41,55,0.8)] rounded-2xl overflow-hidden shadow-xl border border-red-800 flex flex-col"
        >
            <div className="p-4 flex flex-col items-center flex-grow">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-35 h-35 rounded-full object-cover border-4 border-red-800 mb-4"
                />
                <h3 className="text-white text-2xl sm:text-3xl md:text-3xl">
                    {artist.name}
                </h3>
                {/* <p className="text-gray-400 text-xl sm:text-1xl md:text-xl text-center mt-2">{artist.description}</p> */}
            </div>
            <div className="flex space-x-4 items-center justify-evenly mt-4 mb-4">
                {userSession && (
                    <button disabled={isPending} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-red-500 cursor-pointer">
                        {artist.isLiked
                            ? <FaHeart onClick={onUnlikeWrapper} className={`text-red-500 ${isPending && "animate-ping"}`} />
                            : <FaRegHeart onClick={onLikeWrapper} className={isPending && "animate-ping"} />}
                    </button>
                )}
                {artist?.likes?.length > 0 && <span className="text-xl sm:text-2xl md:text-3xl text-gray-300">{artist?.likes?.length} Likes</span>}
                <Link disabled={isPending} to={`/artists/${artist.objectId}`} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-gray-200 cursor-pointer">
                    <FaInfoCircle />
                </Link>
            </div>
        </div>
    )
}