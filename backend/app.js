const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar CORS
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configurar middleware
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si estás usando cookies o autenticación
}));

app.use('/auth', authRoutes);

module.exports = app; // Exportamos la instancia de Express
