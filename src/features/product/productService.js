import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../auth/authService";

const getProducts = async () => {
  const res = await axios.get(`${base_url}product/`);

  return res.data;
};

const getOneProduct = async (id) => {
  const res = await axios.get(`${base_url}product/${id}`);
  return res.data;
};

const createProduct = async (product) => {
  const res = await axios.post(`${base_url}product/`, product, config);
  return res.data;
};

const productService = {
  getProducts,
  getOneProduct,
  createProduct,
};

export default productService;
