const express = require('express');
const cloudinary = require('../../../config/cloudinary'); // tu archivo de configuración
const router = express.Router();

router.post('/upload', (req, res) => {
  const file = req.body.file; // Base64 o URL temporal del archivo

  cloudinary.uploader.upload(file, { folder: 'your_folder_name' }, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json(result); // Devuelve la URL del archivo subido
  });
});

module.exports = router;