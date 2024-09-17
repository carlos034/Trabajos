import { Router } from "express";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import {
  getUsuarios,
  getUsuario,
  deleteUsuario,
} from "../../controllers/gestionarusuarios.controller.js";

const router = Router();

router.get(
  "/administrador/usuarios",
  authRequired,
  roleRequired("administrador"),
  getUsuarios
);

router.get(
  "/administrador/usuarios/:id",
  authRequired,
  roleRequired("administrador"),
  getUsuario
);

router.delete(
  "/administrador/usuarios/:id",
  authRequired,
  roleRequired("administrador"),
  deleteUsuario
);


export default router;
