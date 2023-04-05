import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBCategory,
  resetState,
} from "../../features/bcategory/bcategorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBCategory = useSelector((state) => state.bcategory);
  const { isSuccess, isError, isLoading, createdBCate } = newBCategory;
  useEffect(() => {
    if (isSuccess && createdBCate) {
      toast.success("Brand Add Successfully!");
    }
    if (isError) {
      toast.error("Brand went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Blog Category is Required"),
    }),
    onSubmit: (values) => {
      dispatch(createBCategory(values));
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
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Blog Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
            id="bcategory"
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Cate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
