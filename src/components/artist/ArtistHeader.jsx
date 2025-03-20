export default function ArtistHeader({ artist }) {

    return (
        <div className="bg-[rgba(31,41,55,0.98)] p-6 rounded-xl shadow-lg border border-red-800 flex flex-col md:flex-row items-center">
            <img
                src={artist.image}
                alt={artist.username}
                className="w-48 h-48 rounded-full border-4 border-red-800 object-cover"
            />
            <div className="ml-6 flex-1 text-center md:text-left">
                <h1 className="text-red-600 text-4xl">{artist.name}</h1>
                <p className="text-gray-400 mt-6 text-2xl sm:text-2xl md:text-3">{artist.description}</p>
            </div>
        </div>
    )
}