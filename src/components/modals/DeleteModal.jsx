import { X } from "lucide-react";
import SubmitFormButton from "../partials/form/SubmitFormButton";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function DeleteModal({ isOpen, onClose, onDelete, title }) {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    async function deleteHandler() {
        try {
            setIsPending(true);
            await onDelete()
            onClose()
            navigate(-1);

        } catch (error) {
            //TODO err handling
            console.log(error.message);

        } finally {
            setIsPending(false);
        }

    }
    if (!isOpen) { return null }
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()} // Prevent background click from closing modal
                className="bg-gray-900 border border-gray-400 text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[500px] relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-500 cursor-pointer"
                >
                    <X />
                </button>
                <h2 className="text-2xl mb-4 text-center">Delete Confirmation</h2>
                <div className="mb-6 text-center">
                    <p className="text-gray-300 text-xl">Are you sure you want to delete "<span className="text-red-500">{title}</span>" ?</p>
                </div>
                <div className="flex justify-center space-x-14">
                    <SubmitFormButton isPending={isPending} textContent='Yes' clickHandler={deleteHandler} />
                    <SubmitFormButton isPending={isPending} textContent='No' clickHandler={onClose} />
                </div>
            </div>
        </div>
    );
}
