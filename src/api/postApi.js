import { get } from './fetcher';

async function getPosts(limit, skip) {
  const posts = await get(
    `/classes/Post?limit=${limit}&skip=${skip}&order=-createdAt`
  );
  return posts.results;
}

export default {
  getPosts,
};
