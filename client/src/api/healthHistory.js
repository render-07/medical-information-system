import axios from "axios";

export const createHealthHistory = async (params) => {
  return axios.post("/api/health-history/", params);
};

export const getAllHealthHistory = async () => {
  return axios.get("/api/health-history");
};

export const getMyHealthHistories = async (email) => {
  return axios.get("/api/health-history/patient/my-health-histories", {
    params: {
      email: email,
    },
  });
};

export const getPatientsHealthHistories = async (email) => {
  return axios.get(
    "/api/health-history/physician/get-patient-health-histories",
    {
      params: {
        email: email,
      },
    }
  );
};
