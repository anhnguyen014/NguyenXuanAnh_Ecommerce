import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  resetState,
  updateAPCategory,
} from "../../features/pcategory/pcategorySlice";
import { getAPCategory } from "../../features/pcategory/pcategorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPCategoryId = location.pathname.split("/")[3];
  // console.log(getPCategoryId);
  const newCategory = useSelector((state) => state.pcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    pCategoryName,
    updatedPCategory,
  } = newCategory;
  useEffect(() => {
    if (getPCategoryId !== undefined) {
      dispatch(getAPCategory(getPCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getPCategoryId]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Add Successfully!");
    }
    if (isSuccess && updatedPCategory) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pCategoryName || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Category Name is Required"),
    }),
    onSubmit: (values) => {
      if (getPCategoryId !== undefined) {
        const data = { id: getPCategoryId, pCateData: values };
        dispatch(updateAPCategory(data));
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }

      // toast.success("Brand Add Successfully!");

      // alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getPCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
