import { Link } from "react-router";

export default function TattooCard({ tattoo }) {

    // reusable tattoo card component
    return (
        <div className="relative group w-90 h-full bg-[rgba(31,41,55,0.8)] rounded-2xl overflow-hidden shadow-xl border border-red-800 flex flex-col ">
            <Link to={`/gallery/details/${tattoo.objectId}`} className="cursor-pointer w-full h-auto overflow-hidden rounded-lg">
                <img
                    src={tattoo.image.url}
                    alt={tattoo.title}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>
            <div className="text-center px-2">
                <h3 className="text-xl sm:text-1xl md:text-2xl lg:text-3xl text-white">{tattoo.title}</h3>
            </div>
            <p className="text-white font-medium m-4 bottom">
                Artist:
                <Link to={`/artists/${tattoo.artistId.objectId}`}>
                    <span className="text-red-600 text-1xl sm:text-2xl md:text-3xl cursor-pointer hover:text-yellow-500 hover:scale-110 hover:shadow-lg transition-all duration-300"> {tattoo.artistId.name}</span>
                </Link>
            </p>
        </div>
    )
}