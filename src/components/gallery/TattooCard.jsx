import { Link } from "react-router";
import { GiEvilLove } from "react-icons/gi";
import { useContext } from "react";
import context from "../../context/context";
import { onWishlist, onUnwishlist } from "./galleryUtils";

export default function TattooCard({ tattoo, setTattoos }) {
    const { userSession } = useContext(context);



    return (
        <div className="relative group w-90 h-full bg-[rgba(31,41,55,0.8)] rounded-2xl overflow-hidden shadow-xl border border-red-800 flex flex-col ">
            {/* Image Section */}

            <Link to={`/gallery/details/${tattoo.objectId}`} className="cursor-pointer w-full h-auto overflow-hidden rounded-lg">
                <img
                    src={tattoo.image.url}
                    alt={tattoo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Content Section */}
            <div className="text-center px-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{tattoo.title}</h3>
                <p className="text-xl sm:text-xl md:text-1xl lg:text-2xl text-gray-400 mt-2">
                    {tattoo.description}
                </p>
            </div>

            {/* Artist Info */}
            <p className="text-white font-medium m-4 bottom">
                Posted by:
                <Link to={`/artists/${tattoo.artistId.objectId}`}>
                    <span className="text-red-600 font-bold text-3xl sm:text-3xl md:text-4xl cursor-pointer hover:text-yellow-500 hover:scale-110 hover:shadow-lg transition-all duration-300"> {tattoo.artistId.name}</span>
                </Link>
            </p>

            {userSession && tattoo.artistId.artistId !== userSession._id ?
                <div className="mt-auto mb-4 text-center">
                    {tattoo.isWishlist
                        ? <button onClick={onUnwishlist.bind(tattoo, setTattoos)} className="inline-flex items-center ml-2  text-2xl sm:text-2xl md:text-3xl text-red-600 cursor-pointer hover:text-gray-400 transition duration-300">
                            Remove from wishlist
                            < GiEvilLove />
                        </button>
                        : <button onClick={onWishlist.bind(tattoo, setTattoos)} className="inline-flex items-center ml-2  text-2xl sm:text-2xl md:text-3xl text-gray-400 cursor-pointer hover:text-red-600 transition duration-300">
                            Add to wishlist
                            < GiEvilLove />
                        </button>
                    }  </div> : userSession && tattoo.artistId.artistId == userSession._id ? <div className="mt-auto mb-4 text-center" >
                        <button onClick={onWishlist.bind(tattoo, setTattoos)} className="inline-flex items-center ml-2  text-2xl sm:text-2xl md:text-3xl text-gray-400 cursor-pointer hover:text-red-600 transition duration-300">
                            Delete
                            < GiEvilLove />
                        </button>
                        <button onClick={onWishlist.bind(tattoo, setTattoos)} className="inline-flex items-center ml-2  text-2xl sm:text-2xl md:text-3xl text-gray-400 cursor-pointer hover:text-red-600 transition duration-300">
                            Edit
                            < GiEvilLove />
                        </button>
                    </div> : null}
        </div>
    )
}