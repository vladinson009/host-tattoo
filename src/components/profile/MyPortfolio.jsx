import useArtistPortfolio from "../../hooks/useArtistPortfolio";
import Spinner from "../partials/Spinner";
import ArtistComponent from "../artist/ArtistComponent";
import useMyArtistId from "../../hooks/useMyArtistId";

export default function MyPortfolio() {
    const { artistId } = useMyArtistId();
    const { artist, tattoo, setTattoo } = useArtistPortfolio(artistId)
    if (!artist) return <Spinner />;
    return (
        <ArtistComponent artist={artist} tattoo={tattoo} setTattoo={setTattoo} />
    )

}