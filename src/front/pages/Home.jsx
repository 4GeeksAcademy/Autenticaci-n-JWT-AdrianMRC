import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
// Importa los componentes de React-Bootstrap que vamos a usar
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Home = () => {
    const { store } = useContext(AppContext);

    return (
        // min-vh-100 para altura completa de viewport
        // d-flex, align-items-center, justify-content-center para centrar el contenido vertical y horizontalmente
        // bg-gradient-to-br from-indigo-50 via-white to-cyan-50 se reemplaza con un estilo de fondo personalizado
        <div className="d-flex align-items-center justify-content-center py-5 min-vh-100" style={{ background: 'linear-gradient(to bottom right, #e0f2fe, #fff, #e0f7fa)' }}>
            <Container className="px-4"> {/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 se convierte en Container con padding */}
                <div className="text-center">
                    {/* Título principal */}
                    <h1 className="display-1 fw-bolder text-dark mb-4"> {/* display-1 para el tamaño más grande, fw-bolder para extra negrita */}
                        <span className="d-block mb-2">Welcome to</span>
                        {/* Para el gradiente de texto, necesitamos CSS personalizado */}
                        <span className="d-block text-gradient-primary">
                            AuthApp
                        </span>
                    </h1>
                    {/* Descripción */}
                    <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '800px' }}> {/* lead para texto más grande, text-secondary para gris, mx-auto para centrar, maxWidth para ancho */}
                        A **secure authentication system** built with React, Flask, and bcrypt.
                        Experience modern user authentication with **JWT tokens** and **protected routes**.
                    </p>
                </div>

                {/* Sección de acción (Get Started / Welcome back) */}
                <div className="mt-5 pt-5 mx-auto" style={{ maxWidth: '1000px' }}> {/* mt-16 max-w-4xl mx-auto */}
                    {!store.isAuthenticated ? (
                        <Card className="rounded-4 shadow-lg p-5 transition-transform-shadow"> {/* rounded-4 para más redondez, shadow-xl para sombra, p-5 para padding, transition-transform-shadow para el efecto hover */}
                            <Card.Body>
                                <h2 className="h3 fw-bold text-dark mb-4 text-center">
                                    Get Started
                                </h2>
                                <p className="text-muted lead mb-5 text-center">
                                    Create an account or sign in to access protected content and exciting features.
                                </p>
                                <div className="d-flex flex-column flex-sm-row justify-content-center gap-4"> {/* flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 */}
                                    <Button
                                        as={Link}
                                        to="/signup"
                                        variant="primary" // Color primario de Bootstrap
                                        size="lg" // Tamaño grande
                                        className="rounded-pill px-5 py-3 fw-semibold shadow transition-transform-shadow" // rounded-full, px-8 py-3, font-semibold, shadow-lg
                                    >
                                        <svg className="me-2" style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        Create Account
                                    </Button>
                                    <Button
                                        as={Link}
                                        to="/login"
                                        variant="outline-primary" // Botón con borde primario
                                        size="lg"
                                        className="rounded-pill px-5 py-3 fw-semibold shadow transition-transform-shadow" // rounded-full, border-2
                                    >
                                        <svg className="me-2" style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                                        Sign In
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="rounded-4 shadow-lg p-5 text-center transition-transform-shadow">
                            <Card.Body>
                                <div className="mx-auto bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}> {/* w-20 h-20, bg-green-100 */}
                                    <svg className="text-success" style={{ width: '40px', height: '40px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* w-10 h-10 text-green-600 */}
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h2 className="h3 fw-bold text-dark mb-4">
                                    Welcome back, {store.user?.email}!
                                </h2>
                                <p className="text-muted lead mb-5">
                                    You are successfully logged in. Access your private dashboard to see protected content.
                                </p>
                                <Button
                                    as={Link}
                                    to="/private"
                                    variant="primary"
                                    size="lg"
                                    className="rounded-pill px-5 py-3 fw-semibold shadow transition-transform-shadow d-inline-flex align-items-center justify-content-center"
                                >
                                    <svg className="me-2" style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    Go to Dashboard
                                </Button>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {/* Features Section */}
                <div className="mt-5 pt-5"> {/* mt-20 */}
                    <h3 className="display-6 fw-bolder text-center text-dark mb-5"> {/* text-4xl font-extrabold */}
                        Key Features
                    </h3>
                    <Row xs={1} md={3} className="g-4"> {/* grid grid-cols-1 md:grid-cols-3 gap-10, g-4 para el gap */}
                        {/* Feature Card 1: Secure Authentication */}
                        <Col>
                            <Card className="rounded-4 shadow-lg p-4 text-center h-100 transition-transform-shadow feature-card-hover"> {/* rounded-xl shadow-lg p-8, h-100 para misma altura, feature-card-hover para animaciones */}
                                <Card.Body>
                                    <div className="mx-auto bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center mb-4 feature-icon-bounce" style={{ width: '64px', height: '64px' }}> {/* w-16 h-16 bg-blue-100, feature-icon-bounce para animacion */}
                                        <svg className="text-primary" style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="h5 fw-bold text-dark mb-3">Secure Authentication</h4>
                                    <p className="text-secondary lh-base"> {/* leading-relaxed */}
                                        Robust password hashing with **bcrypt** and modern **JWT token** authentication for robust security.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Feature Card 2: Protected Routes */}
                        <Col>
                            <Card className="rounded-4 shadow-lg p-4 text-center h-100 transition-transform-shadow feature-card-hover">
                                <Card.Body>
                                    <div className="mx-auto bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mb-4 feature-icon-bounce" style={{ width: '64px', height: '64px' }}>
                                        <svg className="text-success" style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="h5 fw-bold text-dark mb-3">Protected Routes</h4>
                                    <p className="text-secondary lh-base">
                                        Implement **route-level protection** to ensure only authenticated users access sensitive content.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Feature Card 3: Modern Stack */}
                        <Col>
                            <Card className="rounded-4 shadow-lg p-4 text-center h-100 transition-transform-shadow feature-card-hover">
                                <Card.Body>
                                    <div className="mx-auto bg-purple-subtle rounded-circle d-flex align-items-center justify-content-center mb-4 feature-icon-bounce" style={{ width: '64px', height: '64px', backgroundColor: 'rgba(128, 0, 128, 0.1)' }}> {/* bg-purple-100 */}
                                        <svg className="text-purple" style={{ width: '32px', height: '32px', color: '#800080' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* text-purple-600 */}
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </div>
                                    <h4 className="h5 fw-bold text-dark mb-3">Modern Tech Stack</h4>
                                    <p className="text-secondary lh-base">
                                        Built with cutting-edge technologies: **React** for frontend, **Flask** for backend, and **Bootstrap** for styling.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Home;