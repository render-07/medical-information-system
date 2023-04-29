import axios from "axios";

export const loginPhysician = async (params) => {
  return axios.post(
    "https://rtumistorage.herokuapp.com/api/user/login/physician",
    params
  );
};

export const createPhysician = async (params) => {
  return axios.post(
    "https://rtumistorage.herokuapp.com/api/user/physician",
    params
  );
};

export const readAllPhysician = async () => {
  return axios.get("https://rtumistorage.herokuapp.com/api/user/physician");
};

export const readPatientMailByName = async (fullName) => {
  return axios.get(
    "https://rtumistorage.herokuapp.com/api/user/physician/get-patient-email",
    {
      params: {
        fullName: fullName,
      },
    }
  );
};
