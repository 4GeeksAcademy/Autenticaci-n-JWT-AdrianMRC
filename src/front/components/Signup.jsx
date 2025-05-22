import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'; // Importa componentes de React-Bootstrap

const Signup = () => {
    const { store, actions } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        actions.setStore({ message: null }); // Limpiar mensaje antes de la nueva solicitud

        const result = await actions.signup(formData.email, formData.password);

        if (result.success) {
            navigate('/login');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: 'linear-gradient(to bottom right, #e0f2fe, #bbdefb)' }}>
            <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}>
                <Card.Body>
                    <h2 className="text-center mb-4 text-3xl font-weight-bold">
                        Create Your Account
                    </h2>
                    <p className="text-center text-muted mb-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary fw-bold text-decoration-none">
                            Sign in here!
                        </Link>
                    </p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email" className="visually-hidden">Email address</Form.Label>
                            <Form.Control
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email} // isInvalid para el estado de error
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password" className="visually-hidden">Password</Form.Label>
                            <Form.Control
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="confirmPassword" className="visually-hidden">Confirm Password</Form.Label>
                            <Form.Control
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {store.message && (
                            <Alert
                                variant={store.message.includes('success') || store.message.includes('created') || store.message.includes('Success') ? 'success' : 'danger'}
                                className="mb-4 d-flex align-items-center"
                            >
                                {/* Iconos simples, puedes usar un SVG o un paquete de iconos si lo deseas */}
                                {store.message.includes('success') || store.message.includes('created') || store.message.includes('Success') ? (
                                    <span className="me-2">&#10003;</span> // Checkmark simple
                                ) : (
                                    <span className="me-2">&#10060;</span> // X mark simple
                                )}
                                {store.message}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100 py-2" // w-100 es 100% width, py-2 es padding vertical
                            disabled={store.loading}
                        >
                            {store.loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Creating account...
                                </>
                            ) : (
                                'Sign up'
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Signup;