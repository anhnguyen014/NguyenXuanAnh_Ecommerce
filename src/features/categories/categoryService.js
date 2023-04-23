import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getAllCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

export const categoryService = { getAllCategories };
