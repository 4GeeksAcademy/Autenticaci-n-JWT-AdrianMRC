import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
// Importa los componentes de React-Bootstrap
import { Container, Card, Spinner, Button, Alert, Row, Col } from 'react-bootstrap';
// Si tienes un componente Navbar ya estilizado con Bootstrap, impórtalo aquí:
// import Navbar from './Navbar'; // Asegúrate de la ruta correcta si lo usas

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
            // d-flex para flexbox, align-items-center y justify-content-center para centrar
            // min-vh-100 para altura mínima de viewport
            // bg-light y un estilo personalizado para el gradiente de fondo
            <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: 'linear-gradient(to bottom right, #e0f2fe, #bbdefb)' }}>
                <Card className="d-flex flex-column align-items-center p-5 shadow-lg rounded-3" style={{ maxWidth: '400px' }}>
                    <Spinner animation="border" variant="primary" className="mb-4" style={{ width: '3rem', height: '3rem' }} />
                    <h4 className="text-center text-secondary mb-2">Validating access...</h4>
                    <p className="text-center text-muted">Please wait while we verify your session.</p>
                </Card>
            </div>
        );
    }

    return (
        // flex-column para layout vertical, min-vh-100 para altura completa
        <div className="d-flex flex-column min-vh-100 bg-light">
            {/* Si ya tienes un componente Navbar de Bootstrap, úsalo aquí */}
            {/* <Navbar /> */}
            {/* Si no, el Navbar de abajo es una versión Bootstrap del que tenías aquí */}
            <nav className="navbar navbar-expand-lg navbar-dark shadow-lg py-3" style={{ background: 'linear-gradient(to right, #4c51bf, #667eea)' }}>
                <Container fluid className="px-4">
                    <h1 className="h4 mb-0 fw-bold text-white">
                        Admin Dashboard
                    </h1>
                    <div className="d-flex align-items-center ms-auto">
                        <span className="text-info me-3 small fw-light">
                            Welcome, <span className="fw-semibold">{store.user?.email}</span>
                        </span>
                        <Button
                            onClick={actions.logout}
                            variant="danger"
                            className="fw-medium shadow-sm transition-colors-transform" // Necesitará la clase CSS personalizada para la transición si la quieres
                        >
                            Logout
                        </Button>
                    </div>
                </Container>
            </nav>

            {/* Main Content */}
            <main className="flex-grow-1 py-5 px-4"> {/* flex-grow-1 para que ocupe el espacio restante, py-5 px-4 para padding */}
                <Container className="my-5">
                    <Card className="p-5 shadow-lg rounded-3 text-center">
                        <Card.Body>
                            <div className="mx-auto bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '120px', height: '120px' }}>
                                <svg className="text-success" style={{ width: '60px', height: '60px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>

                            <h2 className="display-5 fw-bold text-dark mb-4">
                                Welcome to your Private Area!
                            </h2>

                            <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                                🎉 Congratulations! You have successfully logged in and can access this protected content.
                            </p>

                            <Row className="justify-content-center mb-5">
                                <Col md={8} lg={6}>
                                    <Card className="bg-primary-subtle border border-primary-subtle rounded-3 p-4 shadow-sm text-start">
                                        <h3 className="h5 fw-semibold text-dark mb-3 border-bottom pb-2 border-primary-subtle">
                                            Your Account Information
                                        </h3>
                                        <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light">
                                            <span className="text-secondary fw-medium">Email:</span>
                                            <span className="fw-bold text-dark">{store.user?.email}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light">
                                            <span className="text-secondary fw-medium">User ID:</span>
                                            <span className="fw-bold text-dark">{store.user?.id}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center py-2">
                                            <span className="text-secondary fw-medium">Joined:</span>
                                            <span className="fw-bold text-dark">
                                                {store.user?.created_at ? new Date(store.user.created_at).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col md={8} lg={6}>
                                    <div className="d-grid gap-3"> {/* d-grid y gap para espaciado entre divs */}
                                        <Alert variant="info" className="d-flex align-items-start shadow-sm border border-info rounded-3 p-4">
                                            <svg className="text-info flex-shrink-0 me-3 mt-1" style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="text-info fw-normal lh-base"> {/* lh-base para altura de línea normal */}
                                                This page requires **authentication**. Only logged-in users can see this content. Your data is protected.
                                            </span>
                                        </Alert>

                                        <Alert variant="success" className="d-flex align-items-start shadow-sm border border-success rounded-3 p-4">
                                            <svg className="text-success flex-shrink-0 me-3 mt-1" style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="text-success fw-normal lh-base">
                                                Your session is **secure** and your token is valid. Enjoy your access!
                                            </span>
                                        </Alert>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </main>
        </div>
    );
};

export default Private;