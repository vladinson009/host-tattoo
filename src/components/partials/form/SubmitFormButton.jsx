// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function SubmitFormButton({ isPending, textContent, clickHandler }) {

    return (
        <div className="my-6">
            <motion.button
                onClick={clickHandler}
                disabled={isPending}
                type="submit"
                whileHover={{
                    scale: 1.1,
                    backgroundColor: "#dc2626", // Red hover effect
                    boxShadow: "0px 0px 10px rgba(220, 38, 38, 0.8)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={isPending ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.2 }}
                className="text-1xl sm:text-2xl bg-red-600 text-white hover:bg-red-800 hover:text-black py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer text-white hover:bg-red-800 py-3 px-6 rounded-lg">
                {textContent}
            </motion.button>

        </div>
    )
}