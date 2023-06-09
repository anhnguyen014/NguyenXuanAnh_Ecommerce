import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCoupon, resetState } from "../../features/coupon/couponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Add Successfully!");
    }
    if (isError) {
      toast.error("Coupon went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Coupon Name is Required"),
      expiry: Yup.date().required("Expiry date is Required"),
      discount: Yup.number().required("Discount Percentage is Required"),
    }),
    onSubmit: (values) => {
      dispatch(createCoupon(values));

      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      //   alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Thêm khuyến mãi </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Nhập tên khuyến mãi"
            name="name"
            onCh={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            value={formik.values.name}
            id="name"
          />
          <div className="error ">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            placeholder="Nhập ngày hết hạn"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            id="date"
          />
          <div className="error ">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            placeholder="Nhập giá khuyến mãi"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            value={formik.values.discount}
            id="discount"
          />
          <div className="error ">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Thêm khuyến mãi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
