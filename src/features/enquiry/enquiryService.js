import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

const getEnquiries = async () => {
  const res = await axios.get(`${base_url}contact/`);

  return res.data;
};
const deleteAEnquiry = async (id) => {
  const res = await axios.delete(`${base_url}contact/${id}`, config);
  return res.data;
};
const getAEnquiry = async (id) => {
  const res = await axios.get(`${base_url}contact/${id}`);
  return res.data;
};

const updateAEnquiry = async (enq) => {
  const res = await axios.put(
    `${base_url}contact/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return res.data;
};

const enquiryService = {
  getEnquiries,
  deleteAEnquiry,
  getAEnquiry,
  updateAEnquiry,
};

export default enquiryService;
