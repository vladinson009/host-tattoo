import { useState } from 'react';
import SubmitFormButton from '../../partials/form/SubmitFormButton';

export default function EditModal({ isOpen, onClose, onSave, initialTitle, initialDescription }) {
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState(initialDescription || '');

    async function handleSave() {
        await onSave(title, description);
        onClose();
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
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-500"
                >
                    &times;
                </button>

                {/* Modal Header */}
                <h2 className="text-2xl mb-4 text-center">Edit Details</h2>

                {/* Title Input */}
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
                    <SubmitFormButton textContent='Cancel' clickHandler={onClose} />
                    <SubmitFormButton textContent='Edit' clickHandler={handleSave} />
                </div>
            </div>
        </div>
    );
}
