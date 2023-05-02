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

export const updatePatientsPhysician = async (params) => {
  return axios.put("/api/user/patient/update-physician", params);
};
