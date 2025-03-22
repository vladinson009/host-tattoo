import { STUDIO_ADDRESS, STUDIO_INSTAGRAM, STUDIO_NAME } from "../../constants";
import { BsFacebook, BsInstagram } from "react-icons/bs";

export default function Footer() {

    // footer component with social media links, address and studio name
    return (
        <footer className="bg-[rgba(31,41,55,0.98)] text-red-600 py-3 footer w-full ">
            <div className="container mx-auto flex flex-col items-center md:flex-row justify-between px-4">
                <div className="flex justify-center gap-6 mt-0">
                    <a
                        href={STUDIO_INSTAGRAM} className="text-white hover:text-red-700 mx-2 hover:animate-spin" target="_blank" rel="noopener noreferrer">
                        <BsInstagram />
                    </a>
                    <a href="https://www.facebook.com" className="text-white hover:text-red-700 mx-2 hover:animate-spin" target="_blank" rel="noopener noreferrer">
                        <BsFacebook />
                    </a>

                </div>
                <div className="flex justify-center gap-6 mt-0">
                    <p className="text-xl sm:text-2xl md:text-3xl text-white">&copy; {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.</p>
                    <p className="text-xl sm:text-2xl md:text-3xl text-white">{STUDIO_ADDRESS}</p>
                </div>
            </div>
        </footer>
    );
}