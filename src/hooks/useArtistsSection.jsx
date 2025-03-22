import { useContext, useState } from "react";
import context from "../context/context";
import artistService from "../services/artistService";
import userService from "../services/userService";

export default function useArtistSection() {
    const { userSession } = useContext(context);
    const [artists, setArtists] = useState([]);

    // artist section hook to fetch all artists and check if user liked them
    async function fetchArtists(signal) {
        const fetchedArtists = await artistService.getAllArtists(signal);
        const updatedArtists = fetchedArtists.map((artist) => {
            return { ...artist, isLiked: artist?.likes?.includes(userSession?._id) };
        });


        setArtists(updatedArtists);
    }
    async function onLike() {
        const artistId = this.objectId;
        try {
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await artistService.addLikeToArtist(artistId, currentUserId);
            setArtists((prevValue) => refreshArtists(prevValue, likes, artistId));
        } catch (error) {
            //TODO error handling
            console.log(error.message);

        }
    }
    async function onUnlike() {
        const artistId = this.objectId;
        try {
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { likes } = await artistService.removeLikeFromArtist(
                artistId,
                currentUserId
            );
            setArtists((prevValue) => refreshArtists(prevValue, likes, artistId));
        } catch (error) {
            //TODO error handling
            console.log(error.message);

        }
    }
    // util function to refresh users if action
    function refreshArtists(prevValue, likes, artistId) {
        const newArtists = prevValue.map((artist) => {
            if (artist.objectId === artistId) {
                return { ...artist, likes, isLiked: !artist.isLiked };
            }
            return artist;
        });
        return newArtists;
    }
    return { fetchArtists, onLike, onUnlike, artists }
}