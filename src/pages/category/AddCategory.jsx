import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  resetState,
} from "../../features/pcategory/pcategorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pcategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Add Successfully!");
    }
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isError, isLoading, isSuccess]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Category Name is Required"),
    }),
    onSubmit: (values) => {
      dispatch(createCategory(values));
      // toast.success("Brand Add Successfully!");
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      // alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
