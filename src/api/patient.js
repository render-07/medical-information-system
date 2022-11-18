import axios from "axios";

export const createPatient = (params) => {
  return axios.post("http://localhost:5000/api/patient/", params);
};

export const getAllPatient = () => {
  return axios.get("http://localhost:5000/api/patient/");
};
