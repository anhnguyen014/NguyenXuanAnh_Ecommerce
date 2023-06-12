import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getBrands } from "../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPCategories } from "../../features/pcategory/pcategorySlice";
import { getColors } from "../../features/color/colorSlice";
import "react-widgets/styles.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  getOnePromotion,
  resetState,
  updateAPromotion,
} from "../../features/promotion/promotionSlice";

const AddPromotion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPromotionId = location.pathname.split("/")[3];
  const date = new Date();

  useEffect(() => {
    if (getPromotionId !== undefined) {
      dispatch(getOnePromotion(getPromotionId));
    } else {
      dispatch(resetState());
    }
  }, [getPromotionId]);
  const newPromotion = useSelector((state) => state.promotion);

  const {
    isSuccess,
    isLoading,
    isError,
    createdPromotion,
    updatedPromotion,
    promotionProductName,
    promotionStartDate,
    promotionEndDate,
    promotionDiscount,
    promotionStatus,
  } = newPromotion;

  useEffect(() => {
    if (isSuccess && updatedPromotion) {
      toast.success("Cập nhật khuyến mãi thành công!");
      navigate("/admin/promotion-list");
    }
    if (isError) {
      toast.error("Cập nhật khuyến mãi thất bại!");
    }
  }, [isSuccess, isError, updatedPromotion]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: promotionProductName || "",
      startDate: promotionStartDate
        ? new Date(promotionStartDate).toISOString().split("T")[0]
        : 0 || "",
      // startDate: new Date(promotionStartDate).toISOString().split("T")[0] || "",

      // endDate: new Date(promotionEndDate).toISOString().split("T")[0] || "",
      endDate: promotionEndDate
        ? new Date(promotionEndDate).toISOString().split("T")[0]
        : 0 || "",
      // endDate: promotionEndDate || "",
      discount: promotionDiscount || "",
      status: promotionStatus || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Tên khuyến mãi không được để trống!"),
      startDate: Yup.string().required("Ngày bắt đầu không được để trống!"),
      endDate: Yup.string().required("Ngày kết thúc không được để trống!"),
      discount: Yup.number().required("Giảm giá không được để trống!"),
      status: Yup.number().required("Trạng thái không được để trống!"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify("Hi"));
      console.log("====================================");
      console.log("values", values);
      console.log("====================================");
      if (getPromotionId !== undefined) {
        const data = { id: getPromotionId, promotionData: values };
        dispatch(updateAPromotion(data));
        console.log(data);
        dispatch(resetState());
      }
    },
  });
  return (
    <div>
      <h3 className="tittle">Cập nhật khuyến mãi</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            placeholder="Nhập tên sản phẩm"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>

          <CustomInput
            type="number"
            placeholder="Nhập giá"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            value={formik.values.discount}
          />
          <CustomInput
            type="date"
            placeholder="Nhập ngày"
            name="startDate"
            onCh={formik.handleChange("startDate")}
            onBlr={formik.handleBlur("startDate")}
            value={formik.values.startDate}
          />
          <div className="error ">
            {formik.touched.startDate && formik.errors.startDate}
          </div>
          <CustomInput
            type="date"
            placeholder="Nhập ngày"
            name="endDate"
            onCh={formik.handleChange("endDate")}
            onBlr={formik.handleBlur("endDate")}
            value={formik.values.endDate}
          />
          <div className="error ">
            {formik.touched.endDate && formik.errors.endDate}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 my-3"
            id=""
          >
            {promotionStatus === 1 ? (
              <>
                <option value="1">Xuất bản</option>
                <option value="0">Không xuất bản</option>
              </>
            ) : (
              <>
                <option value="0">Không xuất bản</option>
                <option value="1">Xuất bản</option>
              </>
            )}
          </select>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Cập nhật khuyến mãi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPromotion;
