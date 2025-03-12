import { get, put } from './fetcher';

async function getAllArtists() {
  const { results } = await get('/classes/Artist');
  return results;
}
async function addLikeToArtist(artistId, currentUserId) {
  const body = {
    likes: {
      __op: 'AddUnique',
      objects: [currentUserId],
    },
  };
  return put(`/classes/Artist/${artistId}`, body);
}
export default {
  getAllArtists,
  addLikeToArtist,
};
