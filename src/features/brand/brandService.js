import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getBrands = async () => {
  const res = await axios.get(`${base_url}brand/`);

  return res.data;
};

const brandService = {
  getBrands,
};

export default brandService;
