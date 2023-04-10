import axios from "axios";
import { base_url } from "../../utils/base-_url";
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const config = {
  headers: { Authorization: `Bearer ${getTokenFromLocalStorage.token}` },
};

const login = async (user) => {
  const res = await axios.post(`${base_url}user/admin-login`, user);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

// const logout = async () => {
//   const res = await axios.post(`${base_url}user/logout`);

//   return res.data;
// };

const getOrders = async () => {
  const res = await axios.get(`${base_url}user/get-allorders`, config);
  return res.data;
};
const getAOrderByUser = async (id) => {
  const res = await axios.post(
    `${base_url}user/get-order-by-user/${id}`,
    "",
    config
  );
  return res.data;
};

const authService = {
  login,
  getOrders,
  getAOrderByUser,
  // logout,
};

export default authService;
