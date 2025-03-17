import userService from '../../services/userService';
import artistService from '../../services/artistService';

export async function fetchArtists(setArtist, _id, signal) {
  const fetchArists = await artistService.getAllArtists(signal);
  const updatedArtists = fetchArists.map((artist) => {
    return { ...artist, isLiked: artist?.likes?.includes(_id) };
  });
  setArtist(updatedArtists);
}
export function refreshArtists(prevValue, likes, artistId) {
  const newArtists = prevValue.map((artist) => {
    if (artist.objectId === artistId) {
      return { ...artist, likes, isLiked: !artist.isLiked };
    }
    return artist;
  });
  return newArtists;
}
export async function onLike(setArtist) {
  const artistId = this.objectId;
  const { objectId: currentUserId } = await userService.retrieveUser();
  const { likes } = await artistService.addLikeToArtist(artistId, currentUserId);

  setArtist((prevValue) => refreshArtists(prevValue, likes, artistId));
}
export async function onUnlike(setArtist) {
  const artistId = this.objectId;
  const { objectId: currentUserId } = await userService.retrieveUser();
  const { likes } = await artistService.removeLikeFromArtist(
    artistId,
    currentUserId
  );
  setArtist((prevValue) => refreshArtists(prevValue, likes, artistId));
}
export async function onUserLikes() {
  //TODO: Implement user likes functionality
}
