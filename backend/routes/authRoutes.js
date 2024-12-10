const express = require('express');
const { loginUser } = require('../controllers/authController'); // Ruta ajustada correctamente

const router = express.Router();

// Ruta para el login
router.post('/login', loginUser);

module.exports = router;
