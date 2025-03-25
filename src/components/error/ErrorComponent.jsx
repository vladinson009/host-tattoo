import { Link } from "react-router";

export default function ErrorComponent({ title, content, secondContent }) {

    return (
        <div className="min-h-[calc(100vh-4rem-4rem)]  flex flex-col items-center justify-center text-red-600 text-center p-6">
            <div className="bg-[rgba(31,41,55,0.8)] p-4 rounded-2xl shadow-lg border border-gray-800">
                <h2 className="text-4xl font-black mb-6 drop-shadow-lg text-center">{title}</h2>
                <p className="text-2xl">{content}</p>
                {secondContent && <p className="text-2xl">{secondContent}</p>}
                <Link to="/" className="text-2xl text-white hover:underline">Go back to the homepage</Link>
            </div>
        </div>
    )
}