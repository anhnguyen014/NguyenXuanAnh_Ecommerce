import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    return response.data;
  }
};
const loginUser = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};

export const userService = { registerUser, loginUser };
