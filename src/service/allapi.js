
import base_url from "./base_url";
import axios from "axios";


export const adddata = async (data) => {
    return await axios.post(`${base_url}/addemp`, data)
}

export const getemp = async () => {
    return await axios.get(`${base_url}/employees`)
}

export const deletemp = async (id) => {
    return await axios.delete(`${base_url}/deleteemp/${id}`)
}

export const updateemp = async (id, data) => {
    return await axios.put(`${base_url}/updateemp/${id}`, data);
  };