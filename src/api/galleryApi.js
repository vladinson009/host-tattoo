import { get, post } from './fetcher';

async function getGallery(limit, skip) {
  const gallery = await get(
    `/classes/Gallery?limit=${limit}&skip=${skip}&order=-createdAt`
  );
  return gallery.results;
}
function createGalleryPost(data) {
  return post('/classes/Gallery', data);
}

export default {
  getGallery,
  createGalleryPost,
};
