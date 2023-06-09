import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../../features/color/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isLoading,
    isError,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color add successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedColor) {
      toast.success("Color updated successfully!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isLoading, isError]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Color Name is Required"),
    }),
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
      } else {
        dispatch(createColor(values));
        // toast.success("Brand Add Successfully!");
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          // navigate("/admin/color-list");
        }, 300);
      }

      // alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId !== undefined ? "Cập nhật" : "Thêm"} Màu
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            placeholder="Enter Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
            id="color"
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Cập nhật" : "Thêm"} Màu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
