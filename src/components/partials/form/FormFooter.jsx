import { Link } from "react-router"

export default function FormFooter({ text, linkText, link }) {

    // reusable form footer with link for redirection
    return (
        <div className="text-center">
            <p className="text-lg">
                {text} <Link to={link} className="text-red-600 font-semibold hover:text-red-800 hover:underline hover:shadow-md transition-all duration-300 ease-in-out">{linkText}</Link>
            </p>
        </div>
    )
}