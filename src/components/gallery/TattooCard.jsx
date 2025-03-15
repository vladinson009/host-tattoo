import { Link } from "react-router";

export default function TattooCard({ post }) {

    return (
        <div className="relative group w-90 h-full bg-[rgba(31,41,55,0.8)] rounded-2xl overflow-hidden shadow-xl border border-red-800 flex flex-col ">
            {/* Image Section */}
            <div className="cursor-pointer w-full h-auto overflow-hidden rounded-lg">
                <img
                    src={post.image.url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="text-center px-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{post.title}</h3>
                <p className="text-xl sm:text-xl md:text-1xl lg:text-2xl text-gray-400 mt-2">
                    {post.description}
                </p>
            </div>

            {/* Artist Info */}
            {post.artistId.name && <p className="text-white font-medium m-4 bottom">
                Posted by:
                <Link to={`/artists/${post.artistId.objectId}`}>
                    <span className="text-red-600 font-bold text-3xl sm:text-3xl md:text-4xl cursor-pointer hover:text-yellow-500 hover:scale-110 hover:shadow-lg transition-all duration-300"> {post.artistId.name}</span>
                </Link>
            </p>}
        </div>
    )
}