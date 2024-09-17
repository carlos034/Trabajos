import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, usuario, tipo_usuario } = req.body;
  try {

    const usefound = await Usuario.findOne({email})
    if(usefound) 
    return res.status(400).json(["El correo ya esta en uso"]);


    const passwordhash = await bcrypt.hash(password, 10);
    const newUsuario = new Usuario({
      usuario,
      email,
      password: passwordhash,
      tipo_usuario,
    });
    const usuarioSaved = await newUsuario.save();
    const token = await createAccessToken({
      id: usuarioSaved._id,
      tipo_usuario: usuarioSaved.tipo_usuario,
    });

    res.cookie("token", token);
    res.json({
      id: usuarioSaved._id,
      usuario: usuarioSaved.usuario,
      email: usuarioSaved.email,
      tipo_usuario: usuarioSaved.tipo_usuario,
      createdAt: usuarioSaved.createdAt,
      updatedAt: usuarioSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioFound = await Usuario.findOne({ email });
    if (!usuarioFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, usuarioFound.password);
    if (!match)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({
      id: usuarioFound._id,
      tipo_usuario: usuarioFound.tipo_usuario,
    });

    res.cookie("token", token);
    res.json({
      id: usuarioFound._id,
      usuario: usuarioFound.usuario,
      email: usuarioFound.email,
      tipo_usuario: usuarioFound.tipo_usuario,
      createdAt: usuarioFound.createdAt,
      updatedAt: usuarioFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const usuarioFound = await Usuario.findById(req.usuario.id);
  if (!usuarioFound)
    return res.status(400).json({ message: "Usuario no encontrado" });
  return res.json({
    id: usuarioFound._id,
    usuario: usuarioFound.usuario,
    email: usuarioFound.email,
    tipo_usuario: usuarioFound.tipo_usuario,
    createdAt: usuarioFound.createdAt,
    updatedAt: usuarioFound.updatedAt,
  });
};
