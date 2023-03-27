import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getUSer = async () => {
  const res = await axios.get(`${base_url}user/all-users`);

  return res.data;
};

const customerService = {
  getUSer,
};

export default customerService;
