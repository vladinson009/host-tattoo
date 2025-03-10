import { get } from './fetcher';

function getPosts(limit, skip) {
  return get(
    `/classes/Post?include=ownerId&limit=${limit}&skip=${skip}&order=-createdAt`
  );
}

export default {
  getPosts,
};
