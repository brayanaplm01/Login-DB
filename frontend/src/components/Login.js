import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false); // Para diferenciar entre mensajes de éxito y error

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Enviar las credenciales al backend
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                { username, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Incluye cookies si es necesario
                }
            );

            const { token, role } = response.data;

            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Mostrar mensaje de éxito
            setMessage(`Login exitoso. Rol: ${role}`);
            setError(false);

            // Limpiar campos del formulario
            setUsername('');
            setPassword('');

            // TODO: Redirigir al usuario según su rol o cargar el contenido correspondiente
            // Por ejemplo:
            // if (role === 'admin') {
            //     window.location.href = '/admin/dashboard';
            // } else {
            //     window.location.href = '/home';
            // }
        } catch (error) {
            // Manejo de errores
            const errorMessage = error.response?.data?.message || 'Error en el login';
            setMessage(errorMessage);
            setError(true);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>
                    Entrar
                </button>
            </form>
            {message && (
                <p style={{ color: error ? 'red' : 'green', marginTop: '1rem' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;
