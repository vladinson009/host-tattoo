import { useEffect, useState } from "react";
import galleryService from "../../services/galleryService";
import TattooCard from "../gallery/TattooCard";
import Spinner from "../partials/Spinner";

export default function RecentThree() {
    const [recentThree, setRecentThree] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // fetch last three tattoos for home page
    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        galleryService.getLastThree(controller.signal).then((r) => {
            setRecentThree(r);
        }).finally(() => setIsLoading(false));
    }, [])
    if (isLoading) { return <Spinner /> }
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