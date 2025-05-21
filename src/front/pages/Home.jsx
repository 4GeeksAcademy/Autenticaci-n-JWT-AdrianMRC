import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

const Home = () => {
    const { store } = useContext(AppContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Welcome to</span>
                        <span className="block text-indigo-600">AuthApp</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        A secure authentication system built with React, Flask, and bcrypt. 
                        Experience modern user authentication with JWT tokens and protected routes.
                    </p>
                </div>

                <div className="mt-10 max-w-3xl mx-auto">
                    {!store.isAuthenticated ? (
                        <div className="text-center space-y-6">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Get Started
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Create an account or sign in to access protected content and features.
                                </p>
                                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                                    <Link
                                        to="/signup"
                                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                                    >
                                        Create Account
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="w-full sm:w-auto bg-white hover:bg-gray-50 text-indigo-600 font-bold py-3 px-8 rounded-lg border-2 border-indigo-600 transition-colors duration-200 inline-block"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Welcome back, {store.user?.email}!
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    You are successfully logged in. Access your private dashboard to see protected content.
                                </p>
                                <Link
                                    to="/private"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        Authentication Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Authentication</h4>
                            <p className="text-gray-600">Password hashing with bcrypt and JWT token-based authentication.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Protected Routes</h4>
                            <p className="text-gray-600">Route-level protection ensures only authenticated users access private content.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Modern Stack</h4>
                            <p className="text-gray-600">Built with React, Flask, SQL database, and styled with Tailwind CSS.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;