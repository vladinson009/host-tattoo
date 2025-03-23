import useArtistPortfolio from "../../hooks/useArtistPortfolio";
import Spinner from "../partials/Spinner";
import ArtistComponent from "../artist/ArtistComponent";
import useMyArtistId from "../../hooks/useMyArtistId";
import Toast from "../partials/Toast";

export default function MyPortfolio() {
    const { artistId, error } = useMyArtistId();
    const { artist, tattoo, setTattoo } = useArtistPortfolio(artistId)
    if (!artist) return <Spinner />;

    // show my portfolio in My Portfolio section
    return (
        <>
            {error && <Toast message={error} type={error} />}
            <ArtistComponent artist={artist} tattoo={tattoo} setTattoo={setTattoo} />
        </>
    )

}