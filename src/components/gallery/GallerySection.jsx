import { useEffect, useState } from "react";

export default function GallerySection() {
    const [images, setImages] = useState([]);

    // Could be GET or POST/PUT/PATCH/DELETE
    useEffect(() => {
        fetch('https://dummyjson.com/recipes')
            .then(res => res.json())
            .then(result => setImages(result.recipes)
            );
    }, [])

    /* { status: 'ok', method: 'GET' } */

    return (
        <section className="slide-enter-active min-h-screen text-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-black gothic mb-12 drop-shadow-lg text-center pt-16">Tattoo Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
                    {images.map((image, index) => (
                        <div key={index} className="relative group w-72 h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-red-800">
                            <img
                                src={image.image}
                                alt={image.name}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-2xl font-bold gothic text-white">Name</h3>
                                <p className="text-sm text-gray-300 text-center mt-2">Descripition</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}