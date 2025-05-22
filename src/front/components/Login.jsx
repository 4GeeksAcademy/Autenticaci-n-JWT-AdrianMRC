import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
// Importa los componentes de React-Bootstrap que vamos a usar
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
    const { store, actions } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (store.isAuthenticated) {
            navigate('/private');
        }
    }, [store.isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error específico cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await actions.login(formData.email, formData.password);

        if (result.success) {
            // Redirigir a la página privada después del login exitoso
            navigate('/private');
        }
    };

    return (
        // min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
            <Container className="px-4"> {/* max-w-md w-full space-y-8 */}
                <Card className="shadow-lg p-4 p-md-5 mx-auto" style={{ maxWidth: '450px' }}> {/* w-full space-y-8, max-w-md */}
                    <Card.Body>
                        <div className="text-center mb-5">
                            <h2 className="h3 fw-bold text-dark mb-2"> {/* mt-6 text-center text-3xl font-extrabold text-gray-900 */}
                                Sign in to your account
                            </h2>
                            <p className="text-muted small"> {/* mt-2 text-center text-sm text-gray-600 */}
                                Or{' '}
                                <Link to="/signup" className="text-primary fw-medium text-decoration-none"> {/* font-medium text-indigo-600 hover:text-indigo-500 */}
                                    create a new account
                                </Link>
                            </p>
                        </div>

                        <Form onSubmit={handleSubmit}> {/* mt-8 space-y-6 */}
                            {/* Email Input */}
                            <Form.Group className="mb-3"> {/* Equivalente a un div que contiene label e input */}
                                <Form.Label htmlFor="email" className="visually-hidden"> {/* sr-only */}
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    // isInvalid={!!errors.email} se utiliza para aplicar estilos de error de Bootstrap
                                    className={errors.email ? 'is-invalid' : ''} // Tailwind: border-red-300 / border-gray-300
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid"> {/* mt-1 text-sm text-red-600 */}
                                        {errors.email}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            {/* Password Input */}
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="password" className="visually-hidden">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={errors.password ? 'is-invalid' : ''}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            {/* Mensajes de éxito/error del store */}
                            {store.message && (
                                <Alert
                                    // Condicionalmente aplica 'success' o 'danger' basado en el mensaje
                                    variant={store.message.includes('successful') || store.message.includes('success') ? 'success' : 'danger'}
                                    className="mb-4" // Añade margen inferior
                                >
                                    <small>{store.message}</small> {/* text-sm */}
                                </Alert>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary" // bg-indigo-600 hover:bg-indigo-700
                                size="lg" // py-2 px-4, para que ocupe todo el ancho
                                className="w-100 d-flex justify-content-center align-items-center fw-semibold rounded" // w-full flex justify-center, font-medium rounded-md
                                disabled={store.loading} // disabled:opacity-50 disabled:cursor-not-allowed
                            >
                                {store.loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2" // -ml-1 mr-3
                                        />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;