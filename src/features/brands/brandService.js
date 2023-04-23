import axios from "axios";
import { base_url } from "../../utils/axiosConfig";
import { config } from "../../utils/axiosConfig";

const getAllBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};
// const getABrand = async (id) => {
//   const response = await axios.get(`${base_url}blog/${id}`);
//   return response.data;
// };

export const brandService = {
  getAllBrands,
};
