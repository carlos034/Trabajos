import { Router } from "express";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import {
  getCitaMedica,
  getCitasMedicaPaciente,
  createCitaMedica,
  deleteCitaMedica,
  updateCitaMedica,
} from "../../controllers/citamedica.controller.js";
import { validate } from "../../middlewares/Validator.middleware.js";
import { createCita } from "../../validators/citamedica.validator.js";

const router = Router();

router.get(
  "/paciente/citamedica",
  authRequired,
  roleRequired("paciente"),
  getCitasMedicaPaciente
);

router.get(
  "/paciente/citamedica/:id",
  authRequired,
  roleRequired("paciente"),
  getCitaMedica
);

router.post(
  "/paciente/citamedica",
  authRequired,
  roleRequired("paciente"),
  validate(createCita),
  createCitaMedica
);

router.delete(
  "/paciente/citamedica/:id",
  authRequired,
  roleRequired("paciente"),
  deleteCitaMedica
);

router.put(
  "/paciente/citamedica/:id",
  authRequired,
  roleRequired("paciente"),
  updateCitaMedica
);

export default router;
