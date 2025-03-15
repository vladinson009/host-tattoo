// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useState } from "react";
import { FaUpload } from 'react-icons/fa';
export default function UploadFileField({ isPending, labelName, name }) {
    const [image, setImage] = useState(null);
    function handlePhotoChange(e) {
        setImage(e.target.files[0]);
    };
    return (
        <>
            <motion.label
                whileHover={{
                    scale: 1.1,
                    backgroundColor: "#dc2626", // Red hover effect
                    boxShadow: "0px 0px 10px rgba(220, 38, 38, 0.8)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={isPending ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.2 }}
                htmlFor="image"
                className="cursor-pointer flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-red-600  hover:text-black transition w-max">
                <FaUpload className="text-xl" />
                <span>{labelName}</span>
            </motion.label>
            {image && <p className="text-lg text-red-300 truncate">{image.name}</p>}
            <input type="file" id={name} name={name}
                onChange={handlePhotoChange}
                className="hidden"
            />

        </>
    )
}