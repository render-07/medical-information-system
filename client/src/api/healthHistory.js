import axios from "axios";

export const createHealthHistory = async (params) => {
  return axios.post("http://localhost:5000/api/health-history/", params);
};

export const getAllHealthHistory = async () => {
  return axios.get("http://localhost:5000/api/health-history");
};

export const getMyHealthHistories = async (email) => {
  return axios.get(
    "http://localhost:5000/api/health-history/patient/my-health-histories",
    {
      params: {
        email: email,
      },
    }
  );
};

export const getPatientsHealthHistories = async (email) => {
  return axios.get(
    "http://localhost:5000/api/health-history/physician/get-patient-health-histories",
    {
      params: {
        email: email,
      },
    }
  );
};
