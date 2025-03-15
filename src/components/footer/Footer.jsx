import { STUDIO_ADDRESS, STUDIO_INSTAGRAM, STUDIO_NAME } from "../../constants";

export default function Footer() {
    return (
        <footer className="bg-[rgba(31,41,55,0.98)] text-red-600 py-3 footer w-full ">
            <div className="container mx-auto flex flex-col items-center md:flex-row justify-between px-4">
                <div className="flex justify-center gap-6 mt-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">
                    <a
                        href={STUDIO_INSTAGRAM} className="text-red-600 hover:text-red-700 mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-instagram text-6xl"></i>
                    </a>
                    <a href="https://www.facebook.com" className="text-red-600 hover:text-red-700 mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-facebook text-6xl"></i>
                    </a>

                </div>
                <div className="flex justify-center gap-6 mt-0">
                    <p className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">&copy; {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.</p>
                    <p className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">{STUDIO_ADDRESS}</p>
                </div>
            </div>
        </footer>
    );
}