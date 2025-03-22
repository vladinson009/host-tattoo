
import { GiEvilLove } from "react-icons/gi";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import { FaSpinner } from "react-icons/fa6";
import useTattooDetailsButtons from "../../hooks/useTattooDetailsButtons";

export default function TattooButtons({ tattoo, setTattoo }) {
    const { onDelete,
        onEdit,
        onWishlist,
        onUnwishlist,
        userSession,
        isPending,
        isDeleteModalOpen,
        isEditModalOpen,
        setIsDeleteModalOpen,
        setIsEditModalOpen
    } = useTattooDetailsButtons(tattoo, setTattoo)
    return (
        // tattoo buttons for wishlist, edit and delete
        // wishlist button is toggled if the tattoo is already in the wishlist
        <div className="text-center flex justify-center space-x-5">
            {userSession && tattoo?.artistId?.artistId !== userSession._id
                ? tattoo.isWishlist
                    ? <button disabled={isPending} onClick={onUnwishlist.bind(tattoo)} className="inline-flex items-center ml-2  text-2xl sm:text-2xl md:text-3xl text-red-600 cursor-pointer hover:text-gray-400 transition duration-300">
                        {isPending ? <FaSpinner className="text-4xl animate-spin" /> : <>Remove from wishlist < GiEvilLove /></>}
                    </button>
                    : <SubmitFormButton isPending={isPending} textContent="Add to wishlist" clickHandler={onWishlist.bind(tattoo)} />

                : userSession && tattoo.artistId.artistId == userSession._id
                && <>
                    <SubmitFormButton isPending={isPending} textContent="Edit" clickHandler={() => setIsEditModalOpen(true)} />
                    <SubmitFormButton isPending={isPending} textContent="Delete" clickHandler={() => setIsDeleteModalOpen(true)} />
                </>
            }
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={onDelete}
                title={tattoo.title}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={onEdit}
                initialTitle={tattoo.title}
                initialDescription={tattoo.description}
                initialPrice={tattoo.price}
            />
        </div>
    )
}
