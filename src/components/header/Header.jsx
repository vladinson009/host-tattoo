import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { STUDIO_NAME } from "../../constants";
import context from "../../context/context";
import { GiEvilLove } from "react-icons/gi";

const navigation = [
    { value: 'News feed', href: '/news-feed', auth: false },
    { value: 'Gallery', href: '/gallery', auth: false },
    { value: 'Artists', href: '/artists', auth: false },
    { value: <span className="flex items-center">Wishlist<GiEvilLove className="text-red-600 inline" /></span>, href: '/wishlist', auth: 'user' },
    { value: 'Create Tattoo', href: '/create-tattoo', auth: 'Artist' },
    { value: 'Create Post', href: '/create-post', auth: 'user' },
    { value: 'Book Time', href: '/booking', auth: 'user' },
    { value: 'Login', href: '/login', auth: 'guest' },
    { value: 'Register', href: '/register', auth: 'guest' },

]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { userSession } = useContext(context);
    const isArtist = userSession?.role?.includes('Artist')
    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
    };
    function isActive({ isActive }) {
        return { color: isActive && "rgb(252, 211, 77)" }
    }
    function renderNav(nav) {
        return <NavLink style={isActive}
            onClick={setIsOpen.bind(null, false)}
            key={nav.value}
            to={nav.href}
            className="whitespace-nowrap text-lg uppercase transition duration-300 hover:text-red-400 text-white"
        >
            {nav.value}
        </NavLink >
    }
    const filteredNavigation = navigation.filter((item) => {
        if (isArtist) {
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
                <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-widest transition duration-300 text-white hover:text-red-400"><NavLink
                    style={isActive}
                    onClick={setIsOpen.bind(null, false)} to="/" >{STUDIO_NAME}</NavLink></h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 items-center">
                    {filteredNavigation.map(renderNav)}
                </nav>
                {userSession &&
                    <div>

                        <div onClick={toggleUserMenu} className="cursor-pointer flex items-center space-x-4">
                            {/* Profile Image */}

                            <em className="text-white text-md sm:text-sm md:text-md lg:text-2xl transition duration-300 hover:text-red-400">{userSession.username}</em>
                            <img
                                src={userSession.photo || '/public/img/profile.jpg'}
                                alt="profile picture"
                                className="w-10 h-10 sm:w-10 sm:h-10 md:w-1 md:h-11 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-red-600 "
                            />
                            <svg

                                className={`transition-transform duration-300 transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                                width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 7L10 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        {isUserMenuOpen && (
                            <div className="absolute top-16 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                                <div className="flex flex-col space-y-4">
                                    <NavLink
                                        to="/my-posts"
                                        className="hover:text-red-400 transition duration-300"
                                        onClick={() => toggleUserMenu(false)}
                                    >
                                        My Posts
                                    </NavLink>
                                    <NavLink
                                        to="/my-portfolio"
                                        className="hover:text-red-400 transition duration-300"
                                        onClick={() => toggleUserMenu(false)}
                                    >
                                        My Portfolio
                                    </NavLink>
                                    <NavLink
                                        to="/my-messages"
                                        className="hover:text-red-400 transition duration-300"
                                        onClick={() => toggleUserMenu(false)}
                                    >
                                        My Messages
                                    </NavLink>
                                    <NavLink
                                        to="/logout"
                                        className="hover:text-red-400 transition duration-300"
                                        onClick={() => toggleUserMenu(false)}
                                    >
                                        Logout
                                    </NavLink>
                                </div>
                            </div>
                        )}
                    </div>
                }
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