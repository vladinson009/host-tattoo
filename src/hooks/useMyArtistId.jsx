import { useEffect, useState } from "react";
import userService from "../services/userService";
import artistService from "../services/artistService";

export default function useMyArtistId() {
    const [artistId, setArtistId] = useState(null);

    // find artistId in collectioin by userId
    useEffect(() => {
        (async () => {
            try {
                const me = await userService.retrieveUser();
                const myArtistId = await (artistService.getArtistIdByUserId(me.objectId));
                setArtistId(myArtistId);
            } catch (error) {
                //TODO error handling
                console.log(error.message);
            }
        })()
    }, [artistId])
    return { artistId }
}