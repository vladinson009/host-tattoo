import artistService from './artistService';
import { get, post, del, put } from './fetcher';

async function getGallery(skip, limit, signal) {
  const gallery = await get(
    `/classes/Gallery?skip=${skip}&limit=${limit}&order=-createdAt&include=artistId`,
    signal
  );
  return gallery.results;
}
async function getLastThree(signal) {
  const gallery = await get(
    `/classes/Gallery?limit=3&order=-createdAt&include=artistId`,
    signal
  );
  return gallery.results;
}
async function createTattoo(formData, signal) {
  const title = formData.get('title');
  const price = Number(formData.get('price'));
  const description = formData.get('description');
  const image = formData.get('image');

  if (!title) {
    throw new Error('Title is required');
  }
  if (!price) {
    throw new Error('Price is required');
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
    price,
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
async function editTattoo(tattooId, body) {
  return put(`/classes/Gallery/${tattooId}`, body);
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
  return results.map((r) => {
    const tattoo = r.tattooId;
    return {
      ...tattoo,
      isWishlist: results?.some((el) => el.tattooId.objectId == tattoo.objectId),
      artistId: {
        name: r.artistId.name,
        objectId: r.artistId.objectId,
      },
    };
  });
}
async function retrieveWishlistId(ownerId, tattooId, signal) {
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

  return results[0]?.objectId;
}
function addToWishlist(ownerId, tattooId, artistId, signal) {
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
async function removeFromWishlist(ownerId, tattooId, signal) {
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
  return del(`/classes/Wishlist/${results[0].objectId}`, signal);
}
export default {
  //get tattoos from gallery (skip, limit)
  getGallery,

  //get last three tattoos
  getLastThree,

  //create, delete, edit tattoo
  createTattoo,
  deleteTattoo,
  editTattoo,

  //get tattoos by artistId
  getTattoosByArtistId,

  //get tattoo by tattooId
  getTattooById,

  //retrieve my wishlist
  retrieveWishlist,

  //add, remove from wishlist
  removeFromWishlist,
  addToWishlist,

  //retrieve wishlist element ID
  retrieveWishlistId,
};
