import axios from "axios";
import { base_url } from "../../utils/base-_url";

const getEnquiries = async () => {
  const res = await axios.get(`${base_url}contact/`);

  return res.data;
};

const enquiryService = {
  getEnquiries,
};

export default enquiryService;
