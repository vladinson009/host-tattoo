import { Link, useParams } from "react-router";
import { formatDistanceToNow } from "date-fns";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import TattooButtons from "./TattooButtons";
import Spinner from "../partials/Spinner";
import useDetailsTattooSection from "../../hooks/useDetailsTattooSection";
export default function DetailsSection() {
    const { tattooId } = useParams(); // Get the tattoo id from the URL
    const { tattoo, setTattoo, navigate } = useDetailsTattooSection(tattooId);
    if (!tattoo) {
        return <Spinner />;
    }

    // tattoo details section with image, title, description, price, artist name and buttons
    return (
        <section className="min-h-[calc(100vh-4rem-4rem)] text-white pt-25 pb-10">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl text-center mb-6">Tattoo Details</h2>

                <div className="flex flex-col sm:flex-row justify-between items-center bg-[rgba(31,41,55,0.8)] max-w-7xl mx-auto p-4 rounded-lg">
                    <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
                        <img
                            src={tattoo?.image?.url}
                            alt={tattoo?.title}
                            className="w-full h-full object-contain rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="w-full sm:w-1/2 sm:pl-8">
                        <h3 className="text-2xl mb-4">{tattoo?.title}</h3>
                        <Link to={`/artists/${tattoo?.artistId?.objectId}`}><p className="text-lg mb-4">Artist: <span className="text-red-600 text-2xl sm:text-2xl md:text-3xl cursor-pointer hover:text-yellow-500 hover:scale-110 hover:shadow-lg transition-all duration-300">{tattoo?.artistId?.name}</span></p></Link>
                        <p className="text-lg mb-4">{tattoo?.description}</p>
                        <p className="text-lg mb-4">Price: <span className="text-red-500 text-2xl">${tattoo?.price}</span> </p>
                        <p className="text-lg mb-4 text-gray-400">{formatDistanceToNow(new Date(tattoo?.createdAt || 2))} ago</p>
                        <div className="flex flex-row items-center justify-center sm:justify-start space-x-5">
                            <SubmitFormButton textContent="&lt; Back" clickHandler={() => navigate(-1)} />
                            <TattooButtons tattoo={tattoo} setTattoo={setTattoo} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
