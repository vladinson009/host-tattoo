import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle post submission logic
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div className="opacity-75 min-h-screen flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">

                <h1 className="text-4xl mb-8">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg">
                    <label htmlFor="title" className="text-xl">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />

                    <label htmlFor="description" className="text-xl">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full h-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />

                    <label htmlFor="photo" className="cursor-pointer flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-red-600  hover:text-black transition w-max">
                        <FaUpload className="text-xl" />
                        <span>Upload Photo</span>
                    </label>
                    {photo && <p className="text-lg text-red-300 truncate">{photo.name}</p>}
                    <input type="file" id="photo" name="photo" onChange={handlePhotoChange} className="hidden" />

                    <button type="submit" className="bg-black text-white hover:bg-red-600 hover:text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer text-white hover:bg-red-600 py-3 px-6 rounded-lg">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
