import axios from './axios';

export const getUsersRequest = () => axios.get("/administrador/usuarios");

export const deleteUserRequest = (id) => axios.delete(`/administrador/usuarios/${id}`);