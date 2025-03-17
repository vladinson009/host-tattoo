import { get, post, put } from './fetcher';
import userService from './userService';

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
async function addLikeToPost(postId, currentUserId, signal) {
  const body = {
    likes: {
      __op: 'AddUnique',
      objects: [currentUserId],
    },
  };
  return put(`/classes/Post/${postId}`, body, signal);
}
async function removeLikeFromPost(postId, currentUserId, signal) {
  const body = {
    likes: {
      __op: 'Remove',
      objects: [currentUserId],
    },
  };
  return put(`/classes/Post/${postId}`, body, signal);
}
async function createComment(postId, comment, signal) {
  const me = await userService.retrieveUser(signal);

  const body = {
    postId: {
      __type: 'Pointer',
      className: 'Post',
      objectId: postId, // Assuming artistId is the objectId of the artist
    },
    ownerId: {
      __type: 'Pointer',
      className: '_User',
      objectId: me.objectId, // Assuming artistId is the objectId of the artist
    },
    comment,
  };
  return post(`/classes/comments/`, body, signal);
}
async function retrieveComments(postId, signal) {
  const { results } = await get(
    `/classes/comments?where=${encodeURIComponent(
      JSON.stringify({
        postId: {
          __type: 'Pointer',
          className: 'Post',
          objectId: postId, // Assuming artistId is the objectId of the artist
        },
      })
    )}&include=ownerId`,
    signal
  );
  return results;
}

export default {
  getPosts,
  createPost,
  addLikeToPost,
  removeLikeFromPost,
  createComment,
  retrieveComments,
};
