import { Link } from "react-router-dom";
import { useAuth } from "../store/authContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">Mi App</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <Link
                  to="/private"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Panel Privado
                </Link>
                <span className="text-white text-sm">
                  {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;