import { useEffect, useState } from "react";
import userService from "../services/userService";
import artistService from "../services/artistService";

export default function useMyArtistId() {
    const [artistId, setArtistId] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const me = await userService.retrieveUser();
                const myArtistId = await (artistService.getArtistIdByUserId(me.objectId));
                setArtistId(myArtistId.objectId);
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [artistId])
    return { artistId }
}