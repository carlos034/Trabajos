export const roleRequired = (requiredRole) => {
  return (req, res, next) => {
    const { usuario } = req;
    if (!usuario) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const { tipo_usuario } = usuario;
    if (tipo_usuario !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Acceso denegado para el rol del usuario" });
    }

    next();
  };
};
