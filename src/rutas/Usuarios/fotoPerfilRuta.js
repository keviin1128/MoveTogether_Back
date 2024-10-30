const express = require("express");
const router = express.Router();
const subirFotoPerfil = require("../../controladores/Usuarios/fotoPerfil");

// Ruta para actualizar la imagen de perfil
router.post("/:email/profile-picture", subirFotoPerfil);

module.exports = router;
