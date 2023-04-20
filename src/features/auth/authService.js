import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
  },
};

const login = async (user) => {
  const res = await axios.post(`${base_url}user/admin-login`, user);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const getOrders = async () => {
  const res = await axios.get(`${base_url}user/get-allOrders`, config);
  return res.data;
};
const getOrder = async (id) => {
  const res = await axios.get(`${base_url}user/get-a-order/${id}`, config);
  return res.data;
};

const updateOrder = async (data) => {
  const res = await axios.put(
    `${base_url}user/update-order/${data.id}`,
    { status: data.status },
    config
  );
  return res.data;
};
const getMonthlyOrders = async () => {
  const res = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );
  return res.data;
};
const getYearlyStats = async () => {
  const res = await axios.get(`${base_url}user/getYearlyTotalOrder`, config);
  return res.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};

export default authService;
