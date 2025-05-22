import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
// Importa los componentes de React-Bootstrap que vamos a usar
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';

const Navbar = () => {
    const { store, actions } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate('/login');
    };

    return (
        // Usamos el componente Navbar de React-Bootstrap
        // bg-dark para un fondo oscuro, expand="lg" para responsividad en pantallas grandes
        // variant="dark" para texto claro en el navbar oscuro
        // className para estilos personalizados o gradientes si los quieres mantener
        <BSNavbar expand="lg" variant="dark" className="shadow-lg py-3" style={{ background: 'linear-gradient(to right, #4c51bf, #667eea)' }}>
            <Container fluid className="px-4"> {/* fluid para ancho completo, px-4 para padding */}
                {/* Logo/Brand */}
                <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <span className="text-white h4 mb-0 fw-bold">TuApp</span> {/* h4 para tamaño, mb-0 para quitar margen inferior, fw-bold para negrita */}
                </BSNavbar.Brand>

                {/* Toggler para pantallas pequeñas */}
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Contenido colapsable del Navbar */}
                <BSNavbar.Collapse id="basic-navbar-nav">
                    {/* ml-auto para alinear a la derecha los elementos de navegación */}
                    <Nav className="ms-auto d-flex align-items-center">
                        {!store.isAuthenticated ? (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/login"
                                    className="text-white me-3 fw-medium transition-colors-transform" // me-3 para margen derecho, fw-medium para seminegrita
                                >
                                    Login
                                </Nav.Link>
                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant="light" // Fondo blanco
                                    className="fw-semibold shadow-sm transition-colors-transform" // fw-semibold para seminegrita, shadow-sm para sombra ligera
                                >
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/private"
                                    className="text-white me-3 fw-medium transition-colors-transform"
                                >
                                    Dashboard
                                </Nav.Link>
                                <span className="text-info me-3 small fw-light"> {/* text-info para un azul claro, small para tamaño pequeño */}
                                    {store.user?.email}
                                </span>
                                <Button
                                    onClick={handleLogout}
                                    variant="danger" // Botón rojo
                                    className="fw-medium shadow-sm transition-colors-transform"
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;