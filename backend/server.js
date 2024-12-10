const app = require('./app'); // Importamos la aplicación configurada

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
