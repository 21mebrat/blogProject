import React, { useState } from 'react';
import { FaLandmark, FaList } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../context/useAuth';
import image from '../../assets/image.png';
import useLogout from '../../context/useLogout';

const menus = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
];

const Navbar = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const { auth } = useAuth();
    const logout = useLogout();

    return (
        <nav className="w-full h-[4rem] text-secondary-dark flex items-center justify-between px-4">
            {/* Logo */}
            <FaLandmark className="text-2xl" />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            `p-2 ${isActive ? 'text-blue-600 font-bold' : ''}`
                        }
                    >
                        {menu.name}
                    </NavLink>
                ))}

                {/* Admin Menu */}
                { auth?.accessToken && auth?.userName !=='Meb M' && (
                    <div className="flex items-center ml-4">
                        <img
                            src={image}
                            className="w-6 h-6 rounded-full"
                            alt="Admin profile"
                        />
                        <button
                            onClick={logout}
                            className="bg-blue-600 p-2 text-white rounded-xl ml-2"
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* User Menu */}
                {auth?.userName === 'Meb M' && (
                    <div className="flex items-center ml-4">
                        <img
                            src={image}
                            className="w-6 h-6 rounded-full"
                            alt="User profile"
                        />
                        <NavLink
                            to="/dashbord"
                            className="bg-blue-600 p-2 text-white rounded-xl ml-2"
                        >
                            Dashboard
                        </NavLink>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden relative">
                <FaList size={20} onClick={() => setMenuOpened((prev) => !prev)} />
                {menuOpened && (
                    <div className="bg-secondary-dark absolute top-[100%] right-0 z-10 flex flex-col w-[120px] text-center rounded shadow-lg">
                        {menus.map((menu) => (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                onClick={() => setMenuOpened(false)}
                                className={({ isActive }) =>
                                    `p-2 ${isActive ? 'text-blue-600 font-bold' : 'text-white'}`
                                }
                            >
                                {menu.name}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
