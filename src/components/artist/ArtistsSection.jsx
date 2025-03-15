import { useState, useEffect, useContext } from "react";
import context from "../../context/context";

import { fetchArtists } from "./artistUtils";
import ArtistCard from "./ArtistCard";

export default function ArtistsSection() {
    const [artists, setArtist] = useState([]);
    const { userSession } = useContext(context)

    useEffect(() => {
        const controller = new AbortController();
        try {
            (async () => {
                await fetchArtists(setArtist, userSession?._id, controller.signal);
            }
            )();
        } catch (error) {
            //TODO Error handling
            console.log(error);
        }
        return () => controller.abort();
    }, [userSession?._id]);

    return (
        <section className="min-h-[calc(100vh-4rem-4rem)] text-white py-16">
            <h2 className="text-4xl font-black gothic mb-12 drop-shadow-lg text-center pt-16">Our Tattoo Artists</h2>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]  place-items-center gap-10 px-6">
                {artists.map(artist =>
                (<ArtistCard
                    key={artist.objectId}
                    artist={artist}
                    userSession={userSession}
                    setArtist={setArtist} />)
                )}
            </div>
        </section>
    );
}
