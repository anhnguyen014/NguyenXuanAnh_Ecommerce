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
const updatePCategory = async (pCate) => {
  const res = await axios.put(
    `${base_url}category/${pCate.id}`,
    { title: pCate.pCateData.title },
    config
  );
  return res.data;
};
const getPCategory = async (id) => {
  const res = await axios.get(`${base_url}category/${id}`);
  return res.data;
};
const deleteAPCategory = async (id) => {
  const res = await axios.delete(`${base_url}category/${id}`, config);
  return res.data;
};
const pcategoryService = {
  getPCategories,
  createCategory,
  updatePCategory,
  getPCategory,
  deleteAPCategory,
};

export default pcategoryService;
