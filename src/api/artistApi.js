import { get, put } from './fetcher';

async function getAllArtists(signal) {
  const { results } = await get('/classes/Artist', signal);
  return results;
}
async function getArtistById(artistId, signal) {
  return get('/classes/Artist/' + artistId, signal);
}
async function addLikeToArtist(artistId, currentUserId, signal) {
  const body = {
    likes: {
      __op: 'AddUnique',
      objects: [currentUserId],
    },
  };
  return put(`/classes/Artist/${artistId}`, body, signal);
}
async function removeLikeFromArtist(artistId, currentUserId, signal) {
  const body = {
    likes: {
      __op: 'Remove',
      objects: [currentUserId],
    },
  };
  return put(`/classes/Artist/${artistId}`, body, signal);
}
async function getLikes(userIds, signal) {
  const result = await get(
    `/classes/_User?where=${encodeURIComponent(
      JSON.stringify({ objectId: { $in: userIds } })
    )}`,
    signal
  );
  return result.results;
}
export default {
  getAllArtists,
  getArtistById,
  addLikeToArtist,
  removeLikeFromArtist,
  getLikes,
};
