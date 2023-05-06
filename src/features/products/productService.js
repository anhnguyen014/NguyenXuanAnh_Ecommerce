import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
  console.log(data);
  const res = await axios.get(
    `${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
      data?.sort ? `sort=${data?.sort}&&` : ""
    }`
  );
  return res.data;
};

const getSingleProduct = async (id) => {
  const res = await axios.get(`${base_url}product/${id}`);
  return res.data;
};

const getProductByCategory = async (category) => {
  const res = await axios.get(`${base_url}product/category/${category}`);
  return res.data;
}

const addTowWishList = async (prodId) => {
  const res = await axios.put(
    `${base_url}product/wishlist/`,
    { prodId },

    config
  );

  return res.data;
};
const rateProduct = async (data) => {
  const res = await axios.put(
    `${base_url}product/rating`,
    data,

    config
  );

  return res.data;
};

export const productService = {
  getProducts,
  getSingleProduct,
  addTowWishList,
  rateProduct,
  getProductByCategory
};
