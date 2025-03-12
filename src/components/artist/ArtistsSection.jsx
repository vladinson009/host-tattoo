import { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import context from "../../context/context";
import artistApi from "../../api/artistApi";
import { Link } from "react-router";

export default function ArtistsSection() {
    const [artists, setArtist] = useState([]);
    const { userSession } = useContext(context)
    useEffect(() => {
        artistApi.getAllArtists().then(artistsResponse => {
            const updatedArtists = artistsResponse.map((artist) => {
                return { ...artist, isLiked: artist.likes.includes(userSession?._id) }
            })
            setArtist(updatedArtists)
        })
    }, [])
    function onLike() {
        artistApi.addLikeToArtist(this.objectId, userSession._id).then((response) => {
            setArtist(prevValue => {
                const newArtists = prevValue.map((artist) => {
                    if (artist.objectId === this.objectId) {
                        return { ...artist, likes: response.likes, isLiked: !artist.isLiked }
                    }
                    return artist
                })
                return newArtists
            })
        })
    }
    function onUnlike() {
        // TODO: Implement unlike functionality
    }

    return (
        <section className="min-h-screen text-white py-16">
            <h2 className="text-4xl font-black mb-12 drop-shadow-lg text-center pt-16 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">Our Tattoo Artists</h2>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-10 px-6">
                {artists.map((artist) => (
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
                            <h3 className="text-white font-bold text-2xl sm:text-2xl md:text-4xl">
                                {artist.username}
                            </h3>
                            <p className="text-sm text-gray-300 text-center mt-2">{artist.description}</p>
                        </div>
                        <div className="flex space-x-4 items-center justify-evenly mt-4 mb-4">
                            {userSession && (
                                <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-red-500 cursor-pointer">
                                    {artist.isLiked
                                        ? <FaHeart onClick={onUnlike} className="text-red-500" />
                                        : <FaRegHeart onClick={onLike.bind(artist)} />}
                                </button>
                            )}
                            {artist.likes.length > 0 && <span className="text-xl sm:text-2xl md:text-3xl text-gray-300">{artist.likes.length} Likes</span>}
                            <Link to={`/artists/${artist.artistId}`} className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-gray-200 cursor-pointer">
                                <FaInfoCircle />
                            </Link>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
