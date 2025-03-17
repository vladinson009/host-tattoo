import userService from '../../services/userService';
import galleryService from '../../services/galleryService';

export async function fetchGallery(setGallery, _id, signal) {
  const [fetchGallery, wishlist] = await Promise.all([
    galleryService.getGallery(10, 0, signal),
    _id && galleryService.retrieveWishlist(_id, signal),
  ]);
  const updatedGallery = fetchGallery.map((tattoo) => {
    return {
      ...tattoo,
      isWishlist: wishlist?.some((el) => el.tattooId.objectId == tattoo.objectId),
    };
  });
  setGallery(updatedGallery);
}
export function refreshGallery(prevValue, tattooId) {
  const newGallery = prevValue.map((tattoo) => {
    if (tattoo.objectId === tattooId) {
      return { ...tattoo, isWishlist: !tattoo.isWishlist };
    }
    return tattoo;
  });
  return newGallery;
}
export async function onWishlist(setTattoos) {
  const tattooId = this.objectId;
  const { objectId: currentUserId } = await userService.retrieveUser();
  await galleryService.AddToWishlist(currentUserId, tattooId);

  setTattoos((prevValue) => refreshGallery(prevValue, tattooId));
}
export async function onUnwishlist(setTattoos) {
  const tattooId = this.objectId;
  const { objectId: currentUserId } = await userService.retrieveUser();
  const wishlistId = await galleryService.retrieveCurrentWishlistId(
    currentUserId,
    tattooId
  );
  await galleryService.removeFromWishlist(wishlistId);
  setTattoos((prevValue) => refreshGallery(prevValue, tattooId));
}
export async function onUserLikes() {
  //TODO: Implement user wishlist functionality
}
