import { useEffect, useState } from "react";
import galleryApi from "../../api/galleryApi";

export default function GallerySection() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        galleryApi.getGallery(10, 0).then((setPosts))
    }, [])


    return (
        <section className="slide-enter-active min-h-screen  text-white py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-black gothic mb-12 drop-shadow-lg text-center pt-16">Our Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
                    {posts.map((post) => (
                        <div key={post.objectId} className="cursor-pointer relative group w-72 h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-red-800">
                            <img
                                src={post.image.url}
                                alt={post.title}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                            <div className="p-4 flex flex-col items-center">
                                <h3 className="text-2xl font-bold gothic text-white">{post.title}</h3>
                                <p className="text-sm text-gray-300 text-center mt-2">{post.description.length > 65 ? post.description.slice(0, 60) + '...' : post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}