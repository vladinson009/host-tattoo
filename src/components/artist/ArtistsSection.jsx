
import { fetchArtists } from "./artistUtils";
import ArtistCard from "./ArtistCard";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../partials/Spinner";
import { useContext, useState } from "react";
import context from "../../context/context";
import Toast from "../partials/Toast";

export default function ArtistsSection() {
    const { userSession } = useContext(context)
    const [artists, setArtists] = useState([])
    const { isLoading, error } = useFetchData(fetchArtists, setArtists, userSession?._id)
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
                        userSession={userSession}
                        setArtist={setArtists} />)
                    )}
                </div>
            </section>
        </>
    );
}
