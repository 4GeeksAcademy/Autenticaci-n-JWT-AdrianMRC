import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

const Private = () => {
    const { store, actions } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const validateUserAccess = async () => {
            // Si no hay token en el store, redirigir al login
            if (!store.token) {
                navigate('/login');
                return;
            }

            // Validar el token con el backend
            const isValid = await actions.validateToken();
            
            if (!isValid) {
                navigate('/login');
            }
        };

        validateUserAccess();
    }, [store.token, actions, navigate]);

    // Mostrar loading mientras se valida el token
    if (!store.isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-600">Validating access...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                Private Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">
                                Welcome, {store.user?.email}
                            </span>
                            <button
                                onClick={actions.logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-96">
                        <div className="p-8 text-center">
                            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Welcome to your Private Area!
                            </h2>
                            
                            <p className="text-lg text-gray-600 mb-8">
                                🎉 Congratulations! You have successfully logged in and can access this protected content.
                            </p>

                            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Your Account Information
                                </h3>
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-medium text-gray-900">{store.user?.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">User ID:</span>
                                        <span className="font-medium text-gray-900">{store.user?.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Joined:</span>
                                        <span className="font-medium text-gray-900">
                                            {store.user?.created_at ? new Date(store.user.created_at).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-blue-800 text-sm">
                                            This page requires authentication. Only logged-in users can see this content.
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-green-800 text-sm">
                                            Your session is secure and your token is valid.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;