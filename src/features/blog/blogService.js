import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getBlogs = async () => {
  const res = await axios.get(`${base_url}blog/`);

  return res.data;
};

const blogService = {
  getBlogs,
};

export default blogService;
