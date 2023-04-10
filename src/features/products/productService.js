import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getProducts = async () => {
  const res = await axios.get(`${base_url}product/`);
  return res.data;
};

const getAProduct = async (id) => {
  const res = await axios.get(`${base_url}product/${id}`);
  return res.data;
};

export const productService = { getProducts, getAProduct };
