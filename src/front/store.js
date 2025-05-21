const getState = ({ getStore, getActions, setStore }) => {
    return {
        
        store: {
            token: localStorage.getItem("token") || null,
            user: JSON.parse(localStorage.getItem("user")) || null,
            isAuthenticated: !!localStorage.getItem("token"),
            message: null,
            loading: false
        },
        actions: {
            // Función para hacer login
            
            login: async (email, password) => {
                setStore({ loading: true, message: null });
                try {
                    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/';
                    const response = await fetch(`${backendUrl}api/user/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        setStore({
                            token: data.token,
                            user: data.user,
                            isAuthenticated: true,
                            message: data.message || "Login exitoso",
                            loading: false
                        });
                        return { success: true, message: data.message || "Login exitoso" };
                    } else {
                        setStore({ 
                            message: data.message || 'Login fallido',
                            loading: false
                        });
                        return { success: false, message: data.message };
                    }
                } catch (error) {
                    setStore({ 
                        message: 'Error de red. Intenta de nuevo.',
                        loading: false
                    });
                    return { success: false, message: 'Error de red' };
                }
            },

            // Función para registrarse
            signup: async (email, password) => {
                setStore({ loading: true, message: null });
                try {
                    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/';
                    const response = await fetch(`${backendUrl}api/user/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await response.json();
                    setStore({ 
                        message: data.message,
                        loading: false
                    });
                    if (response.ok) {
                        return { success: true, message: data.message };
                    } else {
                        return { success: false, message: data.message };
                    }
                } catch (error) {
                    setStore({ 
                        message: 'Error de red. Intenta de nuevo.',
                        loading: false
                    });
                    return { success: false, message: 'Error de red' };
                }
            },

            // Función para cerrar sesión
            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setStore({
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    message: null
                });
            },

            // Validar token actual usando flask_jwt_extended
            validateToken: async () => {
                const store = getStore();
                if (!store.token) return false;
                try {
                    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/';
                    const response = await fetch(`${backendUrl}api/validate-token`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${store.token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setStore({
                            user: data.user,
                            isAuthenticated: true
                        });
                        localStorage.setItem("user", JSON.stringify(data.user));
                        return true;
                    } else {
                        getActions().logout();
                        return false;
                    }
                } catch (error) {
                    getActions().logout();
                    return false;
                }
            },

            // Función para obtener datos de ruta privada (ejemplo de uso)
            getPrivateData: async () => {
                const store = getStore();
                if (!store.token) return null;
                try {
                    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/';
                    const response = await fetch(`${backendUrl}api/private`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${store.token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },

            // Función para obtener datos públicos (ejemplo)
            getPublicData: async () => {
                try {
                    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/';
                    const response = await fetch(`${backendUrl}api/public`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },

            // Limpiar mensajes
            clearMessage: () => {
                setStore({ message: null });
            }
        }
    };
};
console.log("BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);
export default getState;