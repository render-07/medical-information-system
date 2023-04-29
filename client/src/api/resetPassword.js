import axios from "axios";

export const goToResetPassword = async (params) => {
  return axios.post("/api/reset-password/link-sent", params);
};

export const resetPassword = async (params) => {
  return axios.put("/api/reset-password/update-password", params);
};
