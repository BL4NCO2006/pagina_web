// Importa el módulo Express, que facilita la creación de un servidor web en Node.js
const express = require('express');
// Importa el módulo path, que facilita el manejo de rutas y directorios
const path = require('path');

// Crea una instancia de la aplicación Express
const app = express();
// Define el puerto en el que se ejecutará el servidor, utilizando una variable de entorno o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// Configura EJS como el motor de plantillas para renderizar vistas dinámicas
app.set('view engine', 'ejs');

// Configura el middleware para servir archivos estáticos desde la carpeta "public"
// Esto permite acceder a archivos como CSS, imágenes y JavaScript en la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

(async () => {
    // Carga dinámica del módulo 'chalk' usando import(), permitiendo usar colores en la consola
    const { default: chalk } = await import('chalk');

    // Ruta para la página principal ("/")
    app.get('/', (req, res) => {
        // Imprime un mensaje en verde en la consola cuando se accede a la página principal
        console.log(chalk.green('Acceso a la página principal'));
        // Renderiza la vista 'index.ejs'
        res.render('index');
    });

    // Ruta para la página de login ("/login")
    app.get('/login', (req, res) => {
        // Imprime un mensaje en azul en la consola cuando se accede a la página de login
        console.log(chalk.blue('Acceso a la página de login'));
        // Renderiza la vista 'login.ejs'
        res.render('login');
    });

    // Inicia el servidor en el puerto especificado y muestra un mensaje en amarillo en la consola
    app.listen(PORT, () => {
        console.log(chalk.yellow(`Servidor ejecutándose en http://localhost:${PORT}`));
    }).on('error', (err) => {
        // En caso de error al iniciar el servidor, muestra un mensaje en rojo en la consola con el error
        console.error(chalk.red('Error al iniciar el servidor:'), err);
    });
})();
