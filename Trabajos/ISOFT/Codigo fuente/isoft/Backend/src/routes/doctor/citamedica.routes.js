import { Router } from "express";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import {
  getCitaMedica,
  getCitasMedicaDoctor,
  deleteCitaMedica,
  updateCitaMedica,
} from "../../controllers/citamedica.controller.js";

const router = Router();

router.get(
  "/doctor/citamedica",
  authRequired,
  roleRequired("doctor"),
  getCitasMedicaDoctor
);

router.get(
  "/doctor/citamedica/:id",
  authRequired,
  roleRequired("doctor"),
  getCitaMedica
);

router.delete(
  "/doctor/citamedica/:id",
  authRequired,
  roleRequired("doctor"),
  deleteCitaMedica
);

router.put(
  "/doctor/citamedica/:id",
  authRequired,
  roleRequired("doctor"),
  updateCitaMedica
);

export default router;
