import artistService from './artistService';
import { get, post, del } from './fetcher';

async function getGallery(limit, skip, signal) {
  const gallery = await get(
    `/classes/Gallery?limit=${limit}&skip=${skip}&order=-createdAt&include=artistId`,
    signal
  );
  return gallery.results;
}
async function createTattoo(formData, signal) {
  const title = formData.get('title');
  const description = formData.get('description');
  const image = formData.get('image');

  if (!title) {
    throw new Error('Title is required');
  }
  if (!description) {
    throw new Error('Description is required');
  }
  if (!image) {
    throw new Error('Photo is required');
  }
  if (!image.name) {
    throw new Error('Photo is required!');
  }
  const [file, me] = await Promise.all([
    post(`/files/${image.name}`, image, signal),
    get('/users/me'),
  ]);

  const artistId = await artistService.getArtistIdByUserId(me.objectId);

  const postData = {
    title,
    description,
    image: {
      __type: 'File',
      name: file.name,
      url: file.url,
    },
    artistId: {
      __type: 'Pointer',
      className: 'Artist',
      objectId: artistId,
    },
  };

  return post('/classes/Gallery', postData, signal);
}
function deleteTattoo(tattooId) {
  return del(`/classes/Gallery/${tattooId}`);
}
async function getTattoosByArtistId(artistId, signal) {
  const { results } = await get(
    `/classes/Gallery?where=${encodeURIComponent(
      JSON.stringify({
        artistId: {
          __type: 'Pointer',
          className: 'Artist',
          objectId: artistId,
        },
      })
    )}&include=artistId&order=-createdAt`,
    signal
  );
  return results;
}
async function getTattooById(tattooId, signal) {
  return get(`/classes/Gallery/${tattooId}?include=artistId`, signal);
}
async function retrieveWishlist(ownerId, signal) {
  const { results } = await get(
    `/classes/Wishlist?where=${encodeURIComponent(
      JSON.stringify({
        ownerId: {
          __type: 'Pointer',
          className: '_User',
          objectId: ownerId,
        },
      })
    )}&include=tattooId,artistId`,
    signal
  );

  return results;
}
function AddToWishlist(ownerId, tattooId, artistId, signal) {
  const data = {
    ownerId: {
      __type: 'Pointer',
      className: '_User',
      objectId: ownerId,
    },
    tattooId: {
      __type: 'Pointer',
      className: 'Gallery',
      objectId: tattooId,
    },
    artistId: {
      __type: 'Pointer',
      className: 'Artist',
      objectId: artistId,
    },
  };
  return post('/classes/Wishlist', data, signal);
}
function removeFromWishlist(wishlistId, signal) {
  return del(`/classes/Wishlist/${wishlistId}`, signal);
}
async function retrieveCurrentWishlistId(ownerId, tattooId, signal) {
  const { results } = await get(
    `/classes/Wishlist?where=${encodeURIComponent(
      JSON.stringify({
        ownerId: {
          __type: 'Pointer',
          className: '_User',
          objectId: ownerId,
        },
        tattooId: {
          __type: 'Pointer',
          className: 'Gallery',
          objectId: tattooId,
        },
      })
    )}`,
    signal
  );
  return results[0].objectId;
}
export default {
  getGallery,
  createTattoo,
  deleteTattoo,
  getTattoosByArtistId,
  getTattooById,
  retrieveWishlist,
  retrieveCurrentWishlistId,
  AddToWishlist,
  removeFromWishlist,
};
