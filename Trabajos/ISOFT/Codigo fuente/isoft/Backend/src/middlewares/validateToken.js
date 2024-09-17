import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "Autorizacion denegada, no token" });

  jwt.verify(token, TOKEN_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ message: "Token invalido" });
    res.cookie("token", token);
    req.usuario = usuario;
    next();
  });
};
