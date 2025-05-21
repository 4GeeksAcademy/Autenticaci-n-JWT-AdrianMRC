import React, { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Private from './components/Private';
import ScrollToTop from './components/ScrollToTop';
import useGlobalReducer from './hooks/useGlobalReducer';

// Define el contexto
const GlobalContext = createContext();

const AppRoutes = () => {
    const { store, actions } = useGlobalReducer();
    return (
        <GlobalContext.Provider value={{ store, actions }}>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="private" element={<Private />} />
                    </Route>
                </Routes>
            </Router>
        </GlobalContext.Provider>
    );
};

export default AppRoutes;