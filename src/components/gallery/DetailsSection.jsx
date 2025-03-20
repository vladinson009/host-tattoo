import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import galleryService from "../../services/galleryService";
import { formatDistanceToNow } from "date-fns";
export default function DetailsSection() {
    const { tattooId } = useParams(); // Get the tattoo id from the URL
    const [tattoo, setTattoo] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const data = await galleryService.getTattooById(tattooId, controller.signal)


            setTattoo(data)
        })()
        return () => controller.abort();
    }, [tattooId]);

    if (!tattoo) {
        return <div className="text-white">Loading...</div>;
    }
    return (
        <section className="min-h-[calc(100vh-4rem-4rem)] text-white pt-25 pb-10">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl text-center mb-6">Tattoo Details</h2>

                <div className="flex flex-col sm:flex-row justify-between items-center bg-[rgba(31,41,55,0.8)]">
                    <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
                        <img
                            src={tattoo?.image?.url}
                            alt={tattoo?.title}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="w-full sm:w-1/2 sm:pl-8">
                        <h3 className="text-2xl font-semibold mb-4">{tattoo?.title}</h3>
                        <Link to={`/artists/${tattoo?.artistId.objectId}`}><p className="text-lg mb-4">Artist: <span className="text-red-600 text-1xl sm:text-2xl md:text-3xl cursor-pointer hover:text-yellow-500 hover:scale-110 hover:shadow-lg transition-all duration-300">{tattoo?.artistId?.name}</span></p></Link>
                        <p className="text-lg mb-4">{tattoo?.description}</p>
                        <p className="text-lg mb-4 text-gray-400">{formatDistanceToNow(new Date(tattoo?.createdAt || 2))} ago</p>
                    </div>
                </div>

                <div className="mt-12">
                    <Link
                        to="/gallery"
                        className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-800 transition duration-300"
                    >
                        &lt; Back to Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}
