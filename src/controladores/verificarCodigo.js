const express = require('express');
const Usuario = require('../modelos/usuarios');
const router = express.Router();

router.post('/verificar-codigo', async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.codigoVerificacion === codigo) {
      usuario.codigoVerificacion = null;
      usuario.verificado = true;
      usuario.activo = true; // Activar el usuario tras la verificación
      await usuario.save();

      res.json({ mensaje: 'Código verificado exitosamente. Registro completado.' });
    } else {
      res.status(400).json({ mensaje: 'Código de verificación incorrecto' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error });
  }
});

module.exports = router;
