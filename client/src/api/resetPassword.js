import axios from "axios";

export const goToResetPassword = async (params) => {
  return axios.post(
    "https://rtumistorage.herokuapp.com/api/reset-password/link-sent",
    params
  );
};

export const resetPassword = async (params) => {
  return axios.put(
    "https://rtumistorage.herokuapp.com/api/reset-password/update-password",
    params
  );
};
