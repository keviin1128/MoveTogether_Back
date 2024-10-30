const someProtectedController = (req, res) => {
    res.status(200).json({ message: 'Acceso permitido a la ruta protegida' });
  };
  
  module.exports = someProtectedController;