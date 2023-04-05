import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

const getCoupons = async () => {
  const res = await axios.get(`${base_url}coupon/`);

  return res.data;
};
const createCoupon = async (coupon) => {
  const res = await axios.post(`${base_url}coupon/`, coupon, config);
  return res.data;
};

const couponService = {
  getCoupons,
  createCoupon,
};

export default couponService;
