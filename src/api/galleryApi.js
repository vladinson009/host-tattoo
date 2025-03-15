import { get, post } from './fetcher';

async function getGallery(limit, skip, signal) {
  const gallery = await get(
    `/classes/Gallery?limit=${limit}&skip=${skip}&order=-createdAt&include=artistId`,
    signal
  );
  return gallery.results;
}
function createGalleryPost(data, signal) {
  return post('/classes/Gallery', data, signal);
}
async function getTattoosByArtistId(artistId, signal) {
  const { results } = await get(
    `/classes/Gallery?where=${encodeURIComponent(
      JSON.stringify({
        artistId: {
          __type: 'Pointer',
          className: 'Artist',
          objectId: artistId, // Assuming artistId is the objectId of the artist
        },
      })
    )}&order=-createdAt`,
    signal
  );
  return results;
}
export default {
  getGallery,
  createGalleryPost,
  getTattoosByArtistId,
};
