import { Router } from "express";
import { profile } from "../../controllers/auth.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import { nombrePacientes } from "../../controllers/citamedica.controller.js";

const router = Router();

router.get("/Homedoctor", authRequired, roleRequired("doctor"), profile);
router.get("/Homedoctor/planillapacientes", authRequired,roleRequired("doctor"), nombrePacientes);

export default router;