import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const { store, actions } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600">
                                AuthApp
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
                        {!store.isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/private"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Dashboard
                                </Link>
                                <span className="text-gray-600 text-sm">
                                    {store.user?.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;