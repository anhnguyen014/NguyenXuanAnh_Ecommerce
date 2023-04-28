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

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  return response.data;
};

const getCart = async (data) => {
  const response = await axios.get(`${base_url}user/cart`, data);
  return response.data;
};

const removeProductFromCart = async (data) => {
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${data.id}`,

    data.config2
  );
  return response.data;
};
const updateProductInCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config
  );
  // console.log(cartDetail.cartItemId);
  return response.data;
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    config
  );
  return response.data;
};

const getUserOrder = async () => {
  const response = await axios.get(`${base_url}user/get-my-order`, config);
  return response.data;
};

const updateUser = async (userData) => {
  const response = await axios.put(
    `${base_url}user/edit-user`,
    userData.data,
    userData.config2
  );
  return response.data;
};

const emptyCart = async (data) => {
  const response = await axios.delete(`${base_url}user/empty-cart`, data);
  return response.data;
};

export const userService = {
  registerUser,
  loginUser,
  getUserWishList,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductInCart,
  createOrder,
  getUserOrder,
  updateUser,
  emptyCart,
};
