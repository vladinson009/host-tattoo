import galleryService from "../../services/galleryService";
import TattooCard from "../gallery/TattooCard";
import Spinner from "../partials/Spinner";
import useFetchData from "../../hooks/useFetchData";
import { Navigate } from "react-router";

export default function RecentThree() {
    const { data: recentThree, isLoading, error } = useFetchData(galleryService.getLastThree);

    if (isLoading) { return <Spinner /> }
    if (error) { return Navigate('/error') }
    return (
        <div className="container mx-auto px-6 mb-10 ">
            <h2 className="text-3xl md:text-4xl mb-6 text-white drop-shadow-lg text-center">Our recent work</h2>
            {recentThree.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-20 md:gap-50 lg:gap-50 px-6">
                {recentThree.map((tattoo) => (
                    <TattooCard key={tattoo.objectId} tattoo={tattoo} />
                ))}
            </div>
                : <h2 className="text-3xl md:text-4xl mb-6 text-white drop-shadow-lg text-center">No recent tattos yet...</h2>
            }
        </div>
    )
}