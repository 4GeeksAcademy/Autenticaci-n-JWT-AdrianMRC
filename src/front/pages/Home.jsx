import React, { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useAuth } from "../store/authContext"; // IMPORTA EL HOOK

export const Home = () => {
  const { user, token, loading, login, logout, isAuthenticated } = useAuth();

  const loadMessage = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

      const response = await fetch(backendUrl + "api/hello");
      const data = await response.json();

      // No tienes dispatch en este contexto. 
      // Si quieres manejar mensaje, agrega estado local o modifica el contexto.
      // Aquí solo puedes usar useState para manejar mensaje localmente.

      return data;
    } catch (error) {
      if (error.message)
        throw new Error(
          `Could not fetch the message from the backend.
           Please check if the backend is running and the backend port is public.`
        );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <p className="lead">
        <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
      </p>
      <div className="alert alert-info">
        {/* Aquí deberías mostrar algo que tengas en estado o en contexto */}
        Loading message from the backend (make sure your python 🐍 backend is running)...
      </div>
    </div>
  );
};
