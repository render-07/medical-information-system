import axios from "axios";

export const loginPatient = async (params) => {
  return axios.post("http://localhost:5000/api/user/login/patient", params);
};

export const createPatient = async (params) => {
  return axios.post("http://localhost:5000/api/user/patient/", params);
};

export const readAllPatient = async () => {
  return axios.get("http://localhost:5000/api/user/patient/");
};
