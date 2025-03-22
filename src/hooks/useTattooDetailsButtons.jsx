import { useContext, useState } from "react";
import context from "../context/context";
import galleryService from "../services/galleryService";
import userService from "../services/userService";


export default function useTattooDetailsButtons(tattoo, setTattoo) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { userSession } = useContext(context);

    function onDelete() {
        const tattooId = tattoo.objectId;
        return galleryService.deleteTattoo(tattooId);
    }
    async function onEdit(title, description, price) {
        const tattooId = tattoo.objectId;
        await galleryService.editTattoo(tattooId, { title, description, price: Number(price) });
        setTattoo(prev => ({ ...prev, title, description, price }))
    }

    async function onWishlist() {
        const tattooId = tattoo.objectId;
        const artistId = tattoo.artistId.objectId;
        try {
            setIsPending(true);
            const { objectId: currentUserId } = await userService.retrieveUser();
            const { objectId: wishlistId } = await galleryService.addToWishlist(currentUserId, tattooId, artistId);
            setTattoo(prev => ({ ...prev, isWishlist: wishlistId }))
        } catch (error) {
            //TODO: error handling
            console.log(error.message);
        } finally {
            setIsPending(false)
        }
    }
    async function onUnwishlist() {
        const tattooId = this.objectId;
        try {
            setIsPending(true)
            const { objectId: currentUserId } = await userService.retrieveUser();
            await galleryService.removeFromWishlist(currentUserId, tattooId);
            setTattoo(prev => ({ ...prev, isWishlist: false }))

        } catch (error) {
            //TODO error handling
            console.log(error.message);

        } finally {
            setIsPending(false)
        }
    }
    return {
        // user interration within tattoo details
        onDelete,
        onEdit,
        onWishlist,
        onUnwishlist,

        // modal states
        isDeleteModalOpen,
        isEditModalOpen,
        setIsDeleteModalOpen,
        setIsEditModalOpen,

        // pending state, user session state
        isPending,
        userSession,

    }
}