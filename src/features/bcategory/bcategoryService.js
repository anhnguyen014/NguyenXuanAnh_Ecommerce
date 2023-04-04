import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

const getBCategories = async () => {
  const res = await axios.get(`${base_url}blog_category/`);

  return res.data;
};
const createBlogCategory = async (pcategory) => {
  const res = await axios.post(`${base_url}blog_category/`, pcategory, config);
  return res.data;
};

const bcategoryService = {
  getBCategories,
  createBlogCategory,
};

export default bcategoryService;
