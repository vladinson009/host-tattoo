import { STUDIO_ADDRESS, STUDIO_INSTAGRAM, STUDIO_NAME } from "../../constants";

export default function Footer() {
    return (
        <footer className="bg-black text-red-600 py-3 absolute bottom-0 fixed w-full ">
            <div className="container mx-auto flex flex-col items-center md:flex-row justify-between px-4">
                <div className="flex justify-center gap-6 mt-0">
                    <a
                        href={STUDIO_INSTAGRAM} className="text-red-500 hover:text-red-700 mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-instagram text-6xl"></i>
                    </a>
                    <a href="https://www.facebook.com" className="text-red-500 hover:text-red-700 mx-2" target="_blank" rel="noopener noreferrer">
                        <i className="fa fa-facebook text-6xl"></i>
                    </a>

                </div>
                <div className="flex justify-center gap-6 mt-0">
                    <p className="text-sm">&copy; {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.</p>
                    <p className="text-sm">{STUDIO_ADDRESS}</p>
                </div>
            </div>
        </footer>
    );
}