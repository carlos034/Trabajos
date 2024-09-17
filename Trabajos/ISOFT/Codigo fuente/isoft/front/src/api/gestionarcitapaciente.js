import axios from "./axios";

export const createRequest = (cita) => axios.post("/paciente/citamedica", cita);

export const getcitasRequest = () => axios.get("/paciente/citamedica");

export const getcitaRequest = (id) => axios.get(`/paciente/citamedica/${id}`);

export const UpdatecitaRequest =(id,cita) => axios.put(`/paciente/citamedica/${id}`,cita);

export const deletecitaRequest = (id) => axios.delete(`/paciente/citamedica/${id}`);