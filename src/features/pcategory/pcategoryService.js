import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

const getPCategories = async () => {
  const res = await axios.get(`${base_url}category/`);

  return res.data;
};

const createCategory = async (category) => {
  const res = await axios.post(`${base_url}category/`, category, config);
  return res.data;
};

const pcategoryService = {
  getPCategories,
  createCategory,
};

export default pcategoryService;
