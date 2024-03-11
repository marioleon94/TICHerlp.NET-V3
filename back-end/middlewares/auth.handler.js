const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const ERROR_UNAUTHORIZED = 'Acceso denegado';

const verifyToken = (req, res, next) => {
  try {
    // Obtener el encabezado de autorización
    const authorizationHeader = req.headers['authorization'];

    // Verificar si el encabezado de autorización existe y tiene el formato correcto
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw boom.unauthorized(ERROR_UNAUTHORIZED);
    }

    // Extraer el token de autorización del encabezado
    const token = authorizationHeader.split(' ')[1];

    // Verificar y decodificar el token JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el token ha expirado
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      throw boom.unauthorized('El token ha expirado');
    }

    // Agregar el usuario decodificado al objeto de solicitud para su posterior uso
    req.user = decodedToken;

    // Pasar al siguiente middleware
    next();
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra durante la verificación del token
    next(boom.unauthorized(ERROR_UNAUTHORIZED));
  }
};

module.exports = verifyToken;
