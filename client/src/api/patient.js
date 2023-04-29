import axios from "axios";

export const loginPatient = async (params) => {
  return axios.post("/api/user/login/patient", params);
};

export const createPatient = async (params) => {
  return axios.post("/api/user/patient/", params);
};

export const readAllPatient = async () => {
  return axios.get("/api/user/patient/");
};
