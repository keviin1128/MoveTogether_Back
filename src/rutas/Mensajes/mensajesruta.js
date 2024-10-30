const express = require("express");
const router = express.Router();
const mensajesController = require("../controladores/mensajes");

// Ruta para enviar un mensaje
router.post("/api/mensaje", mensajesController.enviarMensaje);

module.exports = router;