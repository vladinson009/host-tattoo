import { useEffect, useState } from "react";
import ArtistHeader from "../artist/ArtistHeader";
import artistService from "../../services/artistService";
import useMyArtistId from "../../hooks/useMyArtistId";
import Spinner from "../partials/Spinner";
import contactService from "../../services/contactService";
import MessagesList from "./message/messageCard";
import Toast from "../partials/Toast";

export default function MyMessages() {
    const { artistId, error } = useMyArtistId();
    const [artist, setArtist] = useState();
    const [messages, setMessages] = useState();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            if (!artistId) { return }
            // independent fetches resolve in parallel
            const [artist, data] = await Promise.all([
                artistService.getArtistById(artistId, controller.signal),
                contactService.FetchMessages(artistId, controller.signal)
            ])
            setMessages(data);
            setArtist(artist)
        })();
        return () => controller.abort();
    }, [artistId]);


    if (!artist) { return <Spinner /> }

    // artist's only section for messages in My Messages section
    return (
        <div className="max-w-6xl mx-auto px-4 py-22">
            {error && <Toast message={error} type={error} />}
            <ArtistHeader artist={artist} />
            <h2 className="text-white text-3xl mb-5">My messages</h2>
            {messages.length > 0
                ? <MessagesList messages={messages} />
                : <p className="text-gray-400 text-lg mt-5">No Messages yet.</p>}
        </div>
    )
}