import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes';
import './index.css';
import { AppContextProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <AppContextProvider>
        <AppRoutes />
    </AppContextProvider>
);