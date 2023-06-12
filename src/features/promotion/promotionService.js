import axios from "axios";
import { base_url } from "../../utils/base-_url";
import { config } from "../../utils/axiosconfig";

const getPromotions = async () => {
  const res = await axios.get(`${base_url}promotion/`);
  return res.data;
};
const deleteAPromotion = async (id) => {
  const res = await axios.delete(
    `${base_url}promotion/deleteSale/${id}`,
    config
  );
  return res.data;
};

const createPromotion = async (promotion) => {
  // console.log("promotion", promotion);
  const res = await axios.post(
    `${base_url}promotion/createSale/`,
    promotion,
    config
  );
  return res.data;
};
const getOnePromotion = async (id) => {
  const res = await axios.get(`${base_url}promotion/getSale/${id}`);
  return res.data;
};
const updatePromotion = async (promotion) => {
  console.log("promotion", promotion);
  const res = await axios.put(
    `${base_url}promotion/updateSale/${promotion.id}`,
    {
      startDate: promotion.promotionData.startDate,
      endDate: promotion.promotionData.endDate,
      discount: promotion.promotionData.discount,
      status: promotion.promotionData.status,
    },
    config
  );
  return res.data;
};

const promotionService = {
  getPromotions,
  deleteAPromotion,
  createPromotion,
  getOnePromotion,
  updatePromotion,
};
export default promotionService;
