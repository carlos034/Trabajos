import Usuario from "../models/user.model.js";


export const getUsuarios = async (req, res) => {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    }

export const getUsuario = async (req, res) => {
        const usuario = await Usuario.findById(req.params.id)
        if (!usuario)
          return res.status(400).json({ message: "Usuario no encontrado" });
        res.json(usuario);
      };

      export const deleteUsuario = async (req, res) => {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario)
          return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json({});
      };


