import { useState } from 'react';
import SubmitFormButton from '../partials/form/SubmitFormButton';
import { X } from 'lucide-react';


export default function EditModal({ isOpen, onClose, onSave, initialTitle, initialDescription, initialPrice }) {
    const [title, setTitle] = useState(initialTitle || '');
    const [price, setPrice] = useState(initialPrice || '');
    const [description, setDescription] = useState(initialDescription || '');
    const [isPending, setIsPending] = useState(false);
    async function handleSave() {
        setIsPending(true)
        try {
            await onSave(title, description, price);
            onClose();
        } catch (error) {
            //TODO Error handling
            console.log(error.message);
        } finally {
            setIsPending(false)
        }
    };

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

                <h2 className="text-2xl mb-4 text-center">Edit Details</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg mb-2">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none text-lg"
                        placeholder="Enter title"
                    />
                </div>
                {price && <div className="mb-4">
                    <label htmlFor="Price" className="block text-lg mb-2">Price</label>
                    <input
                        id="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none text-lg"
                        placeholder="Enter title"
                    />
                </div>}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-lg mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none text-lg h-32"
                        placeholder="Enter description"
                    />
                </div>
                <div className="flex justify-center space-x-14">
                    <SubmitFormButton isPending={isPending} textContent='Cancel' clickHandler={onClose} />
                    <SubmitFormButton isPending={isPending} textContent='Edit' clickHandler={handleSave} />

                </div>
            </div>
        </div>
    );
}
