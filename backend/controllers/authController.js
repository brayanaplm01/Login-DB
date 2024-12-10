const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_secreto_seguro';

module.exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    // Validación: Verificar si el usuario y la contraseña están presentes en la solicitud
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    const query = `SELECT * FROM users WHERE username = ?`;
    
    // Buscar usuario en la base de datos
    db.get(query, [username], (err, user) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (!user) {
            // Usuario no encontrado
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comprobación si la contraseña está cifrada o en texto plano
        if (user.password.startsWith('$2b$')) {
            // Si la contraseña tiene el formato de un hash bcrypt
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ message: 'Error interno del servidor' });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: 'Credenciales incorrectas' });
                }

                // Token JWT en caso de éxito
                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );

                res.status(200).json({ message: `Bienvenido, ${user.username}`, token, role: user.role });
            });
        } else {
            // Si la contraseña no está cifrada, hacer una comparación directa
            if (password !== user.password) {
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: `Bienvenido, ${user.username}`, token, role: user.role });
        }
    });
};
