const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_iot'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos exitosa');
});

// Middleware para analizar las solicitudes JSON
app.use(bodyParser.json());

// Middleware para permitir solicitudes CORS desde todos los orígenes
app.use(cors());

// Middleware para configurar la sesión
app.use(session({
    secret: 'tu_secreto', // Cambia esto por una cadena secreta más segura
    resave: false,
    saveUninitialized: true
}));

// Middleware para permitir solicitudes CORS desde todos los orígenes
app.use(cors());

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Consulta SQL para verificar las credenciales del usuario
    const sql = `SELECT * FROM users WHERE user = ? AND password = ?`;
    db.query(sql, [username, md5(password)], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error en el servidor' });
        throw err;
      }
      if (result.length > 0) {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    });
  });
// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor en funcionamiento en http://localhost:${PORT}`));