import { useEffect, useState } from "react";
import galleryApi from "../../api/galleryApi";
import TattooCard from "./TattooCard";

export default function GallerySection() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const controller = new AbortController()
        galleryApi.getGallery(10, 0, controller.signal).then((setPosts))
        return () => controller.abort();
    }, [])


    return (
        <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16 ">
            <div className="container mx-auto px-6 ">
                <h2 className="text-4xl font-black mb-12 drop-shadow-lg text-center pt-16">Our Gallery</h2>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                    {posts.map((post) => (
                        <TattooCard key={post.objectId} post={post} />
                    ))}
                </div>
            </div>
        </section>
    )
}