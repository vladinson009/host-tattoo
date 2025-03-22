import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// custom toast component
export default function Toast({ message, type }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    function typeColor(type) {
        if (type == 'message') {
            return 'bg-green-600'
        } else {
            return 'bg-red-600'
        }
    }
    return (
        isOpen && <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className={`z-950 fixed top-1/7 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg text-white ${typeColor(type)}`}
            role="alert"
            onClick={() => setIsOpen(false)}

        >
            <div className="flex items-center space-x-3">
                <span className="text-center">{message}</span>
            </div>
        </motion.div>
    );
}

