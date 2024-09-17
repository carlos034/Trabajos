import axios from "./axios";

export const createRequest = (historial) => axios.post('/doctor/historialmedico',historial);

export const gethistsRequest = () => axios.get(`/doctor/historialmedico`);

export const gethistspacRequest = () => axios.get(`/paciente/historialmedico`);

export const updatecitaRequest =() => axios.put(`/doctor/historialmedico`);