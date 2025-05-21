import { useState, useEffect } from 'react';
import getState from '../store';

const useGlobalReducer = () => {
    const [state, setState] = useState(getState({
        getStore: () => state,
        getActions: () => actions,
        setStore: (updatedStore) => setState({
            ...state,
            store: { ...state.store, ...updatedStore }
        })
    }).store);

    const actions = getState({
        getStore: () => state,
        getActions: () => actions,
        setStore: (updatedStore) => setState({
            ...state,
            store: { ...state.store, ...updatedStore }
        })
    }).actions;

    useEffect(() => {
        // Inicializar estado desde sessionStorage al cargar la aplicación
        const token = sessionStorage.getItem("token");
        const user = sessionStorage.getItem("user");
        
        if (token && user) {
            setState(prevState => ({
                ...prevState,
                store: {
                    ...prevState.store,
                    token: token,
                    user: JSON.parse(user),
                    isAuthenticated: true
                }
            }));
        }
    }, []);

    return {
        store: state,
        actions: actions
    };
};

export default useGlobalReducer;