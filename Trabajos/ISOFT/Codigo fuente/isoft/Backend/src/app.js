import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

import config from "./config.js";
import authRoutes from "./routes/auth.routes.js";

import Homedoctor from "./routes/doctor/home.routes.js";
import nombrepacientes from "./routes/doctor/home.routes.js";
import citaMedicaDoctor from "./routes/doctor/citamedica.routes.js";
import historialMedicoDoctor from "./routes/doctor/historialmedico.routes.js";

import Homepaciente from "./routes/paciente/home.routes.js";
import nombredoctores from "./routes/paciente/home.routes.js";
import historialMedicoPaciente from "./routes/paciente/historialmedico.routes.js";
import citaMedicaPaciente from "./routes/paciente/citamedica.routes.js";

import Homeadministrador from "./routes/administrador/home.routes.js";
import gestionarUsuarios from "./routes/administrador/gestionarusuarios.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",citaMedicaDoctor);
app.use("/api",citaMedicaPaciente);
app.use("/api",Homedoctor);
app.use("/api",Homepaciente);
app.use("/api",nombredoctores);
app.use("/api",Homeadministrador);
app.use("/api",nombrepacientes);
app.use("/api",historialMedicoDoctor);
app.use("/api",historialMedicoPaciente);
app.use("/api",gestionarUsuarios);

//settings
app.set("port", config.port);

export default app;
