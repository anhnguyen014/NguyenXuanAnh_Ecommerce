import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

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

const updateProduct = async (product) => {
  const res = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      category: product.productData.category,
      brand: product.productData.brand,
      images: product.productData.images,
      color: product.productData.color,
      tags: product.productData.tags,
      price: product.productData.price,
      quantity: product.productData.quantity,
    },
    config
  );
  return res.data;
};
const deleteAProduct = async (id) => {
  const res = await axios.delete(`${base_url}product/${id}`, config);
  return res.data;
};

const productService = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteAProduct,
};

export default productService;
