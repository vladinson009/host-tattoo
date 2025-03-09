import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { STUDIO_NAME } from "../../constants";
import context from "../../context/context";

const navigation = [
    { value: 'Favorite', href: '/favorite', auth: 'user' },
    { value: 'Gallery', href: '/gallery', auth: false },
    { value: 'Artists', href: '/artists', auth: false },
    { value: 'Contact Us', href: '/contact', auth: false },
    { value: 'Login', href: '/users/login', auth: 'guest' },
    { value: 'Register', href: '/users/register', auth: 'guest' },
    { value: 'Logout', href: '/users/logout', auth: 'user' },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { userSession } = useContext(context);

    function isActive({ isActive }) {
        return { color: isActive && "rgb(82, 133, 139)" }

    }
    function renderNav(nav) {
        if (userSession && nav.auth != 'guest') {
            return <NavLink style={isActive}
                onClick={setIsOpen.bind(null, false)}
                key={nav.value}
                to={nav.href}
                className="text-lg uppercase transition duration-300 hover:text-red-400"
            >
                {nav.value}
            </NavLink >

        } else if (!userSession && nav.auth != 'user') {
            return <NavLink
                style={isActive}
                onClick={setIsOpen.bind(null, false)}
                key={nav.value}
                to={nav.href}
                className="text-lg uppercase transition duration-300 hover:text-red-400"
            >
                {nav.value}
            </NavLink>
        }
    }

    return (
        <header className="bg-black text-red-600 shadow-lg fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <h1 className="text-3xl font-black tracking-widest gothic"><NavLink
                    style={isActive}
                    onClick={setIsOpen.bind(null, false)} to="/" >{STUDIO_NAME}</NavLink></h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    {navigation.map(renderNav)}
                </nav>
                {userSession && <em className='mr-2'>{userSession.email}</em>}
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
                    className="md:hidden bg-black text-red-600 flex flex-col gap-4 p-4 shadow-lg"
                >
                    {navigation.map(renderNav)}
                </motion.div>
            )}
        </header>
    );
}