import { useEffect, useState } from "react";
import galleryService from "../../services/galleryService";
import TattooCard from "../gallery/TattooCard";
import Spinner from "../partials/Spinner";

export default function RecentThree() {
    const [recentThree, setRecentThree] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
            {recentThree.length > 0 ? <div className="place-items-center grid grid-cols-3 place-items-center gap-6 md:gap-8 lg:gap-10 px-6">
                {recentThree.map((tattoo) => (
                    <TattooCard key={tattoo.objectId} tattoo={tattoo} setTattoos={setRecentThree} />
                ))}
            </div>
                : <h2 className="text-3xl md:text-4xl mb-6 text-white drop-shadow-lg text-center">No recent tattos yet...</h2>
            }
        </div>
    )
}