const express = require("express");
const router = express.Router();
const { enviarMensaje } = require("../../controladores/Mensajes/enviarMensajes");


// Ruta para enviar un mensaje
router.post("/mensaje", enviarMensaje);

module.exports = router;