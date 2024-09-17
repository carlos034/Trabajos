import Usuario from "../models/user.model.js";

export const nombresDoctores = async (req, res, next) => {
    try {
      const nombresDoctores = await Usuario.find({ tipo_usuario: 'doctor' }, 'usuario');
      res.json(nombresDoctores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    next();
  };