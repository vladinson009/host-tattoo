import { Link } from "react-router";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";

import { onLike, onUnlike, onUserLikes } from "./artistUtils";

export default function ArtistCard({ artist, userSession, setArtist }) {
    return (
        <div
            key={artist.objectId}
            className="relative group w-72 h-full bg-[rgba(31,41,55,0.8)] rounded-2xl overflow-hidden shadow-xl border border-red-800 flex flex-col "
        >
            <div className="p-4 flex flex-col items-center flex-grow">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-35 h-35 rounded-full object-cover border-4 border-red-800 mb-4"
                />
                <h3 className="text-white text-5xl sm:text-2xl md:text-4xl font-bold ">
                    {artist.name}
                </h3>
                <p className="text-gray-400 text-3xl sm:text-2xl md:text-3xl text-center mt-2">This is just a demo description for tattoo artist who just started to work in our tattoo studio</p>
            </div>
            <div className="flex space-x-4 items-center justify-evenly mt-4 mb-4">
                {userSession && (
                    <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-red-500 cursor-pointer">
                        {artist.isLiked
                            ? <FaHeart onClick={onUnlike.bind(artist, setArtist)} className="text-red-500" />
                            : <FaRegHeart onClick={onLike.bind(artist, setArtist)} />}
                    </button>
                )}
                {artist?.likes?.length > 0 && <span onClick={onUserLikes.bind(artist)} className="text-xl sm:text-2xl md:text-3xl text-gray-300 cursor-pointer hover:text-red-700">{artist?.likes?.length} Likes</span>}
                <Link to={`/artists/${artist.objectId}`} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-gray-200 cursor-pointer">
                    <FaInfoCircle />
                </Link>
            </div>
        </div>
    )
}