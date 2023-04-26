import axios from "axios";

export const goToResetPassword = async (params) => {
  return axios.post(
    "http://localhost:5000/api/reset-password/link-sent",
    params
  );
};

export const resetPassword = async (params) => {
  return axios.put(
    "http://localhost:5000/api/reset-password/update-password",
    params
  );
};
