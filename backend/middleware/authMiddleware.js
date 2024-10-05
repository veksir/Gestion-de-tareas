const jwt = require("jsonwebtoken");
const User = require("../models/User");

const proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extrae el token del encabezado
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token

      req.user = await User.findById(decoded.id).select("-password"); // Agrega el usuario a la solicitud

      next(); // Si el usuario está autenticado, continúa
    } catch (error) {
      console.error("Error de autenticación:", error);
      return res.status(401).json({ mensaje: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    return res.status(401).json({ mensaje: "No autorizado, no hay token" });
  }
};

module.exports = { proteger };
