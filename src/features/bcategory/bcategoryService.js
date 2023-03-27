import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getBCategories = async () => {
  const res = await axios.get(`${base_url}blog_category/`);

  return res.data;
};

const bcategoryService = {
  getBCategories,
};

export default bcategoryService;
