import { del, get, put } from './fetcher';

async function getAllArtists(signal) {
  const { results } = await get('/classes/Artist', signal);
  return results;
}
async function getArtistById(artistId, signal) {
  return get('/classes/Artist/' + artistId, signal);
}
async function getArtistIdByUserId(userId, signal) {
  const result = await get(`/classes/Artist?where={"artistId":"${userId}"}`, signal);
  return result.results[0].objectId;
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
function archiveMessageById(messageId, signal) {
  return del(`/classes/Contact/${messageId}`, signal);
}
export default {
  getAllArtists,
  getArtistById,
  addLikeToArtist,
  removeLikeFromArtist,
  getLikes,
  getArtistIdByUserId,
  archiveMessageById,
};
