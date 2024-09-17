import { Router } from "express";
import { profile } from "../../controllers/auth.controller.js";
import { authRequired } from "../../middlewares/validateToken.js";
import { roleRequired } from "../../middlewares/authRol.middleware.js";
import { nombresDoctores } from "../../middlewares/nombreDoctores.middleware.js";

const router = Router();

router.get("/Homepaciente", authRequired, roleRequired("paciente"), profile);
router.get("/Homepaciente/nombredoctores", authRequired,roleRequired("paciente"), nombresDoctores);

export default router;