import axios from "axios";

export const loginPatient = async (params) => {
  return axios.post(
    "https://rtumistorage.herokuapp.com/api/user/login/patient",
    params
  );
};

export const createPatient = async (params) => {
  return axios.post(
    "https://rtumistorage.herokuapp.com/api/user/patient/",
    params
  );
};

export const readAllPatient = async () => {
  return axios.get("https://rtumistorage.herokuapp.com/api/user/patient/");
};
