import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";

export default function ArtistsSection() {
    const [artists, setArtist] = useState([]);

    useEffect(() => {

        fetch('https://dummyjson.com/recipes')
            .then(res => res.json())
            .then(result => setArtist(result.recipes.slice(0, 12))
            );
    }, [])

    return (
        <section className="min-h-screen text-white py-16">
            <h2 className="text-4xl font-black gothic mb-12 drop-shadow-lg text-center pt-16">Our Tattoo Artists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
                {artists.map((artist, index) => (
                    <div key={index} className="relative group w-72 h-96 bg-gray-700 rounded-2xl overflow-hidden shadow-xl border border-red-800">
                        <div className="p-4 flex flex-col items-center">
                            <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-35 h-35 rounded-full object-cover border-4 border-red-800 mb-4"
                            />
                            <h3 className="text-2xl font-bold gothic text-white">Artist name is here</h3>
                            <p className="text-sm text-gray-300 text-center mt-2">Hello my name is John and i would like to make you some tattoo.kjl</p>
                        </div>
                        <div className="flex space-x-4 items-center justify-evenly mt-4">
                            <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-red-500">
                                {false ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                            </button>
                            <button className="text-4xl sm:text-5xl md:text-6xl text-gray-400 hover:text-gray-200">
                                <FaInfoCircle />
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
