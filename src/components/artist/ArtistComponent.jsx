import TattooCard from "../gallery/TattooCard";
import ArtistHeader from "./ArtistHeader";


export default function ArtistComponent({ artist, tattoo, setTattoo }) {

    return (
        <div className="max-w-6xl mx-auto px-4 py-22">
            {/* Artist Info */}
            <ArtistHeader artist={artist} />

            {/* Artist's Work Gallery */}
            <div className="mt-10">
                <h2 className="text-white text-3xl mb-5">Tattoo Portfolio</h2>
                {tattoo.length > 0 ? (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-20 md:gap-25 lg:gap-30 px-6">
                        {tattoo.map(t => <TattooCard key={t.objectId} tattoo={t} setTattoos={setTattoo} />)}
                    </div>
                ) : (
                    <p className="text-gray-400 text-lg mt-5">No tattoos uploaded yet.</p>
                )}
            </div>

        </div>
    );
}