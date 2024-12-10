const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear la conexión con SQLite
const dbPath = path.resolve(__dirname, '../users.db'); // Ajusta la ruta para acceder a la base de datos
console.log('Ruta a la base de datos:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos SQLite:', err.message);
    } else {
        console.log('Conexión exitosa con la base de datos SQLite');
    }
});

module.exports = db;
