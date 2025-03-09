import { STUDIO_NAME, STUDIO_WELCOMEMSG } from "../../constants";
import { useEffect, useState } from "react";
export default function Home() {

    const [images, setImages] = useState([]);

    // Could be GET or POST/PUT/PATCH/DELETE
    useEffect(() => {

        fetch('https://dummyjson.com/recipes')
            .then(res => res.json())
            .then(result => setImages(result.recipes.slice(0, 6))
            );
    }, [])

    /* { status: 'ok', method: 'GET' } */

    return (
        <section
            id="home"
            className="min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6 pt-32 pb-32"
        >
            {/* Hero Title */}
            <h1 className="sm:text-3xl md:text-4xl lg:text-6xl font-black gothic drop-shadow-lg">WELCOME TO {STUDIO_NAME}</h1>
            <p className="font-gothic sm:text-xl md:text-3xl lg:text-3xl mt-4 max-w-2xl">
                {STUDIO_WELCOMEMSG}
            </p>

            {/* Call to Action */}
            <a
                href="#booking"
                className="mt-6 px-6 py-3 bg-red-600 text-black text-xl font-bold uppercase rounded-lg shadow-lg hover:bg-red-800 transition"
            >
                Book Now
            </a>
            <div className="mt-16 w-full text-center">
                <h2 className="text-3xl font-bold text-black mb-8">Recent Tattoos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 ">
                    {images.map((tattoo, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                            <img
                                src={tattoo.image}
                                alt={`Recent Tattoo ${index + 1}`}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-white text-lg font-semibold">Tattoo {index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}