const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Para procesar los datos del formulario

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Crear una conexión con la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia según tu configuración
    password: '1117132755', // Cambia según tu configuración
    database: 'pagina_web' // Cambia con el nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para el login (muestra el formulario)
app.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para procesar el login
app.post('/login', (req, res) => {
    const { primer_nombre, contraseña } = req.body; // Obtenemos el primer nombre y la contraseña del formulario

    // Validamos que el primer nombre y la contraseña estén presentes
    if (!primer_nombre || !contraseña) {
        return res.status(400).send('Por favor, ingrese el primer nombre y la contraseña');
    }

    // Consulta a la base de datos para verificar el usuario y la contraseña
    db.query('SELECT * FROM usuarios WHERE primer_nombre = ? AND contraseña = ?', [primer_nombre, contraseña], (err, results) => {
        if (err) {
            console.error('Error al autenticar el usuario:', err);
            return res.status(500).send('Error en la autenticación');
        }

        if (results.length === 0) {
            // Si no se encuentra el usuario con esas credenciales, mostramos un mensaje de error
            return res.status(401).send('Credenciales incorrectas');
        }

        // Si se encuentra el usuario, redirigimos a la página principal con el nombre del usuario
        const usuario = results[0];
        res.redirect('/index?primer_nombre=' + usuario.primer_nombre + '&id=' + usuario.id); // Redirige al index con el nombre y id
    });
});

// Ruta para mostrar la página principal
app.get('/index', (req, res) => {
    const { primer_nombre, id } = req.query; // Obtenemos el primer nombre y id del usuario desde la URL
    res.render('index', { primer_nombre, id });
});

// Ruta para mostrar los datos del usuario
app.get('/formulario/:id', (req, res) => {
    const usuarioId = req.params.id;

    db.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res.status(500).send('Error al obtener los datos del usuario');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const usuario = results[0];
        res.render('formulario', { usuario });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
