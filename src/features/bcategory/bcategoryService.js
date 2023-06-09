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
const updateBlogCategory = async (blogCate) => {
  const res = await axios.put(
    `${base_url}blog_category/${blogCate.id}`,
    { title: blogCate.blogCateData.title },
    config
  );
  return res.data;
};
const getABlogCategory = async (id) => {
  const res = await axios.get(`${base_url}blog_category/${id}`);
  return res.data;
};
const deleteABlogCategory = async (id) => {
  const res = await axios.delete(`${base_url}blog_category/${id}`, config);
  return res.data;
};
const bcategoryService = {
  getBCategories,
  createBlogCategory,
  updateBlogCategory,
  getABlogCategory,
  deleteABlogCategory,
};

export default bcategoryService;
