require('dotenv').config();
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
     return res.status(403).send('Token requerido');
  }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Token inválido');
      }
      req.cliente = decoded.cliente;
      next();
    });
  }

  module.exports = {verificarToken};


