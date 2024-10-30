const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Cargar variables de entorno

const express = require("express"); // Importar Express
const mongoose = require("mongoose"); // Importar Mongoose
const connectDB = require("./config/db.config.js"); // Importar función de conexión a la BD
const cors = require("cors"); // Importar CORS
const cloudinary = require("./config/cloudinary.js"); // Importar configuración de Cloudinary

const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

// Importar rutas
const crearUsuario = require("./src/rutas/Registro/crearUsuarioRuta.js");
const login = require("./src/rutas/Registro/loginRuta.js");
const verificarCodigo = require("./src/rutas/Registro/verificarCodigoRuta.js");
const cambiarContrasenia = require("./src/rutas/Registro/cambiarContraseniaRuta.js");
const buscarPorNombre = require("./src/rutas/Usuarios/buscarPorNombreRuta.js");
const buscarPerfil = require("./src/rutas/Usuarios/buscarPerfilRuta.js");
const actualizarPerfil = require("./src/rutas/Usuarios/actualizarPerfilRuta.js");
const fotoPerfil = require("./src/rutas/Usuarios/fotoPerfilRuta.js");
const agregarAmigo = require("./src/rutas/Amigos/agregarAmigoRuta.js");
const eliminarAmigo = require("./src/rutas/Amigos/eliminarAmigoRuta.js");
const listarAmigos = require("./src/rutas/Amigos/listarAmigosRuta.js");
const uploadRuta = require("./src/rutas/Imagenes/uploadRuta.js");
const logout = require('./src/rutas/Registro/logoutRuta.js');
const proteccion = require('./src/rutas/Registro/protecRutas');

//posts
const crearPublicacion = require("./src/rutas/Posts/crearPublicacionRuta.js");
const PublicacionesUsuarios = require("./src/rutas/Posts/publicacionesUsuarioRuta.js");
const feed = require("./src/rutas/Posts/feedRuta.js");
const eliminarPost = require("./src/rutas/Posts/eliminarPostRuta.js");
const actualizarPost = require("./src/rutas/Posts/actualizarPostRuta.js");

//mensajes
//const mensaje = require("./src/rutas/Mensajes/enviarMensajesRuta.js");
// const conversacion = require("./src/rutas/Mensajes/conversacionruta.js");
// const visto = require("./src/rutas/Mensajes/vistoRuta.js");

// Conexión a la base de datos
connectDB();

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173", // Origen local para desarrollo
  "http://localhost:3000",
  "https://movetogether.netlify.app" // Origen de tu frontend desplegado
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El CORS policy no permite el acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Importar rutas

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de MoveTogether");
});

app.use("/api", crearUsuario);
app.use("/api", verificarCodigo);
app.use("/api", login);
app.use("/api", logout);
app.use("/api", proteccion);
app.use("/api", cambiarContrasenia);
app.use("/api", buscarPorNombre);
app.use("/api", buscarPerfil);
app.use("/api", actualizarPerfil);
app.use("/api", fotoPerfil);
app.use("/api", agregarAmigo);
app.use("/api", eliminarAmigo);
app.use("/api", listarAmigos);
app.use("/api", crearPublicacion);
app.use("/api", PublicacionesUsuarios);
app.use("/api", feed);
app.use("/api", eliminarPost);
app.use("/api", actualizarPost);
//app.use("/api", mensaje);
app.use("/api", uploadRuta);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Servidor
app.listen(PORT, () => {
  console.log(
    `--------> Backend escuchando en http://localhost:${PORT} <--------`
  );
});
