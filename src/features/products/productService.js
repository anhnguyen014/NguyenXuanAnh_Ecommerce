import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const res = await axios.get(`${base_url}product/`);
  return res.data;
};

const getSingleProduct = async (id) => {
  const res = await axios.get(`${base_url}product/${id}`);
  return res.data;
};

const addTowWishList = async (prodId) => {
  const res = await axios.put(
    `${base_url}product/wishlist/`,
    { prodId },

    config
  );

  return res.data;
};

export const productService = {
  getProducts,
  getSingleProduct,
  addTowWishList,
};
