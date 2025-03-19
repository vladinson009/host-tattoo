
import { useParams } from "react-router";
import useArtistPortfolio from "../../hooks/useArtistPortfolio";

import Spinner from "../partials/Spinner";
import ArtistComponent from "./ArtistComponent";

export default function ArtistDetails() {
    const { artistId } = useParams();
    const { artist, tattoo, setTattoo } = useArtistPortfolio(artistId);
    if (!artist) return <Spinner />;
    return (
        <ArtistComponent artist={artist} tattoo={tattoo} setTattoo={setTattoo} />
    );
}
