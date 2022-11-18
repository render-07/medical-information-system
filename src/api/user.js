import axios from "axios";

const getUsers = () => {
  return axios.get("http://localhost:5000/api/users/get-all");
};

export const createUser = (params) => {
  return axios.post("http://localhost:5000/api/user/register", params);
};

export const loginUser = (params) => {
  return axios.post("http://localhost:5000/api/user/login", params);
};

export default getUsers;
