import galleryService from "../../services/galleryService";
import TattoosComponent from "../gallery/TattoosComponent";

async function fetchWishlist(setGallery, _id, signal) {
    const wishlist = await galleryService.retrieveWishlist(_id, signal)
    const updatedGallery = wishlist.map((t) => {
        const tattoo = t.tattooId
        return {
            ...tattoo,
            isWishlist: wishlist?.some((el) => el.tattooId.objectId == tattoo.objectId),
            artistId: {
                name: t.artistId.name,
                objectId: t.artistId.objectId
            },

        };
    });
    setGallery(updatedGallery);
}

export default function WishlistSection() {

    return <TattoosComponent title={'My Wishlist'} fetchData={fetchWishlist} />

}