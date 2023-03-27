import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getPCategories = async () => {
  const res = await axios.get(`${base_url}category/`);

  return res.data;
};

const pcategoryService = {
  getPCategories,
};

export default pcategoryService;
