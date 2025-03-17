import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="text-red-500 animate-spin text-4xl" />
        </div>)
}