import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

const getBrands = async () => {
  const res = await axios.get(`${base_url}brand/`);
  return res.data;
};
const createBrand = async (brand) => {
  const res = await axios.post(`${base_url}brand/`, brand, config);
  return res.data;
};

const updateBrand = async (brand) => {
  const res = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title, images: brand.brandData.images },
    config
  );
  return res.data;
};
const getBrand = async (id) => {
  const res = await axios.get(`${base_url}brand/${id}`);
  return res.data;
};
const deleteABrand = async (id) => {
  const res = await axios.delete(`${base_url}brand/${id}`, config);
  return res.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteABrand,
};

export default brandService;
