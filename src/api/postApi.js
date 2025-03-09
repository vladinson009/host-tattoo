import { get } from './fetcher';

function getTenPosts(limit, skip) {
  return get(`/classes/Post?limit=${limit}&skip=${skip}&order=-createdAt`);
}

export default {
  getTenPosts,
};
