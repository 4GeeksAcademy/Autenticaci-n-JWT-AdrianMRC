import React, { createContext, useState } from "react";
import getState from "../store";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [state, setState] = useState(
        getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore =>
                setState(prevState => ({
                    store: { ...prevState.store, ...updatedStore },
                    actions: { ...prevState.actions }
                }))
        })
    );

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    );
};