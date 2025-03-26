import { useContext } from "react"
import useFetchData from "../../hooks/useFetchData"
import galleryService from "../../services/galleryService"
import context from "../../context/context"
import NoContent from "../partials/NoContent";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import TattooCard from "../gallery/TattooCard";

export default function WishlistSection() {
    const { userSession } = useContext(context);
    const { data, isLoading, error } = useFetchData(galleryService.retrieveWishlist, 'retrieveWishlist', userSession._id)

    // wishlist section to fetch private area data for user
    if (isLoading) return <Spinner />
    return (
        <>
            {error && <Toast message={error} />}
            <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16 ">
                <div className="container mx-auto px-6 ">
                    <h2 className="text-4xl font-black mb-12 drop-shadow-lg text-center pt-16">My Wishlist</h2>
                    {data?.length > 0 ? <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                        {data.map((tattoo) => (
                            <TattooCard key={tattoo.objectId} tattoo={tattoo} />
                        ))}
                    </div>
                        : <NoContent content="Nothing in Wishlist yet..." />}
                </div>
            </section>
        </>
    )

}