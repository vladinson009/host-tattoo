import { get, post, del } from './fetcher';

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
function deleteGalleryPost(tattooId, signal) {
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
    )}&order=-createdAt`,
    signal
  );
  return results;
}
async function getTattooById(tattooId, signal) {
  return get(`/classes/Gallery/${tattooId}`, signal);
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
    )}&include=tattooId`,
    signal
  );
  return results;
}
function AddToWishlist(ownerId, tattooId, signal) {
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
  createGalleryPost,
  getTattoosByArtistId,
  getTattooById,
  retrieveWishlist,
  retrieveCurrentWishlistId,
  AddToWishlist,
  removeFromWishlist,
  deleteGalleryPost,
};
