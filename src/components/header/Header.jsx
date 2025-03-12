import { NavLink } from "react-router";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { STUDIO_NAME } from "../../constants";
import context from "../../context/context";
import { FaHeart } from "react-icons/fa";

const navigation = [
    { value: <FaHeart />, href: '/favorite', auth: 'user' },
    { value: 'News feed', href: '/news-feed', auth: false },
    { value: 'Create Tattoo', href: '/create-tattoo', auth: 'Artist' },
    { value: 'Create Post', href: '/create-post', auth: 'user' },
    { value: 'Gallery', href: '/gallery', auth: false },
    { value: 'Artists', href: '/artists', auth: false },
    { value: 'Contact Us', href: '/contact', auth: 'user' },
    { value: 'Login', href: '/login', auth: 'guest' },
    { value: 'Register', href: '/register', auth: 'guest' },
    { value: 'Logout', href: '/logout', auth: 'user' },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { userSession } = useContext(context);

    function isActive({ isActive }) {
        return { color: isActive && "rgb(252, 211, 77)" }
    }
    function renderNav(nav) {
        if (userSession && nav.auth != 'guest') {
            return <NavLink style={isActive}
                onClick={setIsOpen.bind(null, false)}
                key={nav.value}
                to={nav.href}
                className="whitespace-nowrap text-lg uppercase transition duration-300 hover:text-red-400 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
            >
                {nav.value}
            </NavLink >
        } else if (!userSession && nav.auth != 'user') {
            return <NavLink
                style={isActive}
                onClick={setIsOpen.bind(null, false)}
                key={nav.value}
                to={nav.href}
                className="whitespace-nowrap text-lg uppercase transition duration-300 hover:text-red-400 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
            >
                {nav.value}
            </NavLink>
        }
    }

    const filteredNavigation = navigation.filter((item) => {
        if (userSession?.role?.includes('Artist')) {
            return item.auth === "Artist" || item.auth === "user" || item.auth === false;
        } else if (userSession) {
            return item.auth === "user" || item.auth === false;
        } else if (!userSession) {
            return item.auth === "guest" || item.auth === false;
        }
        return false;
    });
    return (
        <header className="bg-[rgba(31,41,55,0.98)] text-red-600 shadow-lg fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-widest bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"><NavLink
                    style={isActive}
                    onClick={setIsOpen.bind(null, false)} to="/" >{STUDIO_NAME}</NavLink></h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {filteredNavigation.map(renderNav)}
                </nav>
                {userSession && <div className="flex items-center space-x-4">
                    {/* Profile Image */}
                    <em className="text-white text-md sm:text-sm md:text-md lg:text-2xl">{userSession.email}</em>
                    <img
                        src={userSession.photo || '/public/img/profile.jpg'}
                        alt="profile picture"
                        className="w-10 h-10 sm:w-10 sm:h-10 md:w-1 md:h-11 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-red-600"
                    />
                    {/* User Email */}
                </div>}
                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={setIsOpen.bind(null, !isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-[rgba(31,41,55,0.1)] text-red-600 flex flex-col gap-4 p-4 shadow-lg"
                >
                    {filteredNavigation.map(renderNav)}
                </motion.div>
            )}
        </header>
    );
}