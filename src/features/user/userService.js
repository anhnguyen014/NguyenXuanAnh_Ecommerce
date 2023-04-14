import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
  },
};

const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  return response.data;
};
const loginUser = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishList = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  return response.data;
};

export const userService = { registerUser, loginUser, getUserWishList };
