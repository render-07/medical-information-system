import axios from "axios";

export const loginPhysician = async (params) => {
  return axios.post("http://localhost:5000/api/user/login/physician", params);
};

export const createPhysician = async (params) => {
  return axios.post("http://localhost:5000/api/user/physician", params);
};

export const readAllPhysician = async () => {
  return axios.get("http://localhost:5000/api/user/physician");
};

export const readPatientMailByName = async (fullName) => {
  return axios.get(
    "http://localhost:5000/api/user/physician/get-patient-email",
    {
      params: {
        fullName: fullName,
      },
    }
  );
};
