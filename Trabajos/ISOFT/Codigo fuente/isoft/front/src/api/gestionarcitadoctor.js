import axios from "./axios";

export const getcitasdocRequest = () => axios.get("/doctor/citamedica");

export const UpdatecitadocRequest =() => axios.put(`/doctor/citamedica`);

export const deletecitadocRequest = (id) => axios.delete(`/doctor/citamedica/${id}`);
