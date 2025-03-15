import { get, post } from './fetcher';

async function getPosts(limit, skip, signal) {
  const posts = await get(
    `/classes/Post?limit=${limit}&skip=${skip}&order=-createdAt`,
    signal
  );
  return posts.results;
}
async function createPost(formData, signal) {
  const title = formData.get('title');
  const image = formData.get('image');
  const description = formData.get('description');

  if (!title) {
    throw new Error('Title is required');
  }
  if (!description) {
    throw new Error('Description is required');
  }
  if (!image) {
    throw new Error('Photo is required');
  }

  const [file, me] = await Promise.all([
    post(`/files/${image.name}`, image, signal),
    get('/users/me'),
  ]);

  const postData = {
    title,
    description,
    image: {
      __type: 'File',
      name: file.name,
      url: file.url,
    },
    ownerId: {
      __type: 'Pointer',
      className: '_User',
      objectId: me.objectId,
    },
    owner: me.username,
  };
  return post('/classes/Post', postData, signal);
}

export default {
  getPosts,
  createPost,
};
