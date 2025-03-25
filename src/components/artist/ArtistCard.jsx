import { Link } from "react-router";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import userService from "../../services/userService";
import artistService from "../../services/artistService";
import context from "../../context/context";


export default function ArtistCard({ artist, }) {
    const [currentArtist, setCurrentArtist] = useState(artist);
    const { userSession } = useContext(context)
    const [isPending, setIsPending] = useState(false);
    const isLiked = userSession && currentArtist.likes.includes(userSession._id)
    const artistId = currentArtist.objectId;

    async function onLike() {
        setIsPending(true);
        try {
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await artistService.addLikeToArtist(artistId, currentUserId);
            setCurrentArtist((prevValue) => ({ ...prevValue, likes, isLiked }));
            setIsPending(false);

        } catch (error) {
            <Navigate to="/error" state={error} />

        }
    }
    async function onUnlike() {
        setIsPending(true);
        try {
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await artistService.removeLikeFromArtist(
                artistId,
                currentUserId
            );
            setCurrentArtist((prevValue) => ({ ...prevValue, likes, isLiked }));
            setIsPending(false);
        } catch (error) {
            <Navigate to="/error" state={error} />



        }
    }

    // artists card component with like, unlike, info buttons
    return (
        <div

            className="relative group w-72 h-full bg-[rgba(31,41,55,0.8)] rounded-2xl overflow-hidden shadow-xl border border-red-800 flex flex-col"
        >
            <div className="p-4 flex flex-col items-center flex-grow">
                <img
                    src={currentArtist.image}
                    alt={currentArtist.name}
                    className="w-35 h-35 rounded-full object-cover border-4 border-red-800 mb-4"
                />
                <h3 className="text-white text-2xl sm:text-3xl md:text-3xl">
                    {currentArtist.name}
                </h3>
            </div>
            <div className="flex space-x-4 items-center justify-evenly mt-4 mb-4">
                {userSession && (
                    <button disabled={isPending} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-red-500 cursor-pointer">
                        {isLiked
                            ? <FaHeart onClick={onUnlike} className={`text-red-500 ${isPending && "animate-ping"}`} />
                            : <FaRegHeart onClick={onLike} className={isPending && "animate-ping"} />}
                    </button>
                )}
                {currentArtist?.likes?.length > 0 && <span className="text-xl sm:text-2xl md:text-3xl text-gray-300">{currentArtist?.likes?.length} Likes</span>}
                <Link disabled={isPending} to={`/artists/${currentArtist.objectId}`} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-gray-200 cursor-pointer">
                    <FaInfoCircle />
                </Link>
            </div>
        </div>
    )
}