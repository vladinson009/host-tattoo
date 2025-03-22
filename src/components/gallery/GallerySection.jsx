import useFetchData from "../../hooks/useFetchData";

import TattooCard from "./TattooCard";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import NoContent from "../partials/NoContent";
import galleryService from "../../services/galleryService";

export default function GallerySection() {
    const { data, isLoading, error } = useFetchData(galleryService.getGallery)

    if (isLoading) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16 ">
                <div className="container mx-auto px-6 ">
                    <h2 className="text-4xl font-black mb-12 drop-shadow-lg text-center pt-16">Our Tattoo Gallery</h2>
                    {data.length > 0 ? <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                        {data.map((tattoo) => (
                            <TattooCard key={tattoo.objectId} tattoo={tattoo} />
                        ))}
                    </div>
                        : <NoContent content="Nothing in Gallery yet..." />}
                </div>
            </section>
        </>
    )
}