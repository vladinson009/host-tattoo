import { get, post } from './fetcher';

function getGallery(limit, skip) {
  return get(`/classes/Gallery?limit=${limit}&skip=${skip}&order=-createdAt`);
}
function createGalleryPost(data) {
  return post('/classes/Gallery', data);
}

export default {
  getGallery,
  createGalleryPost,
};
