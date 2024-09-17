import { Router } from "express";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import {
  createHistorialMedico,
  GetHistorialesMedicosDoctor,
  getHistorialmedico,
  updateHistorialMedico,
  deleteHistorialMedico,
} from "../../controllers/historialmedico.controller.js";

const router = Router();

router.get(
  "/doctor/historialmedico",
  authRequired,
  roleRequired("doctor"),
  GetHistorialesMedicosDoctor
);

router.get(
  "/doctor/historialmedico/:id",
  authRequired,
  roleRequired("doctor"),
  getHistorialmedico
);

router.post(
  "/doctor/historialmedico",
  authRequired,
  roleRequired("doctor"),
  createHistorialMedico
);

router.delete(
  "/doctor/historialmedico/:id",
  authRequired,
  roleRequired("doctor"),
  deleteHistorialMedico
);

router.put(
  "/doctor/historialmedico/:id",
  authRequired,
  roleRequired("doctor"),
  updateHistorialMedico
);

export default router;
