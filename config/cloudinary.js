require('dotenv').config(); // Importar configuración de variables de entorno
const cloudinary = require("cloudinary").v2; // Importar Cloudinary

// Verificar que las variables de entorno están cargadas
if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Faltan variables de entorno de Cloudinary');
}

cloudinary.config({ // Configurar Cloudinary
  cloud_name: process.env.CLOUDINARY_NAME, // Nombre de la nube de Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY, // API Key de Cloudinary
  api_secret: process.env.CLOUDINARY_API_SECRET // API Secret de Cloudinary
});

const opts = {
  overwritw: true, // Sobreescribir la imagen si ya existe
  invalidate: true, // Invalidar la imagen en la CDN
  fetch_format: 'auto', // Formato de la imagen
  resource_type: 'auto', // Tipo de recurso (imagen, video, raw)
}

module.exports = (image) => { // Exportar función para subir imágenes a Cloudinary, pasa la imagen a base64
  return new Promise((resolve, reject) => { // Crear una promesa para subir la imagen
  cloudinary.uploader.upload(image, opts, (error, result) => { // Subir la imagen a Cloudinary
      if (result && result.secure_url) { // Verificar si se subió la imagen correctamente
        console.log(result.secure_url); // Imprimir la URL de la imagen subida
        return resolve(result.secure_url); // Devolver la URL de la imagen subida
      }
      console.log(error.message);   // Imprimir el error en caso de que falle la subida
      return reject({message: error.message}); // Devolver el error en caso de que falle la subida
    });
  });
}

const url = cloudinary.url('Imagen_de_WhatsApp_2024-09-24_a_las_08.58.26_eb7eca5a_dufvwp', {
  transformation: [
    { fetch_format: 'auto', quality: 'auto' }
  ]
});

//console.log(url); // Imprimir la URL generada para verificar que funciona correctamente