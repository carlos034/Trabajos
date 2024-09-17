import { Router } from "express";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import {
  GetHistorialesMedicosPaciente,
  getHistorialmedico,
} from "../../controllers/historialmedico.controller.js";

const router = Router();

router.get(
  "/paciente/historialmedico",
  authRequired,
  roleRequired("paciente"),
  GetHistorialesMedicosPaciente
);

router.get(
  "/paciente/historialmedico/:id",
  authRequired,
  roleRequired("paciente"),
  getHistorialmedico
);

export default router;
