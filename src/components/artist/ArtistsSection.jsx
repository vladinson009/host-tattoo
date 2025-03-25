import ArtistCard from "./ArtistCard";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../partials/Spinner";
import Toast from "../partials/Toast";
import artistService from "../../services/artistService";

// artists section showing all artists card
export default function ArtistsSection() {
    const { data: artists, isLoading, error } = useFetchData(artistService.getAllArtists)
    if (isLoading) { return <Spinner /> }
    return (
        <>
            {error && <Toast message={error} />}
            <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16">
                <h2 className="text-4xl font-black gothic mb-12 drop-shadow-lg text-center pt-16">Our Tattoo Artists</h2>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-10 px-6">
                    {artists?.map(artist =>
                    (<ArtistCard
                        key={artist.objectId}
                        artist={artist}
                    />)
                    )}
                </div>
            </section>
        </>
    );
}
