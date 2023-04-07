import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBCategory,
  getABlogCategory,
  resetState,
  updateABlogCategory,
} from "../../features/bcategory/bcategorySlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogCateId = location.pathname.split("/")[3];
  const newBCategory = useSelector((state) => state.bcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBCate,
    updatedBCate,
    blogCateName,
  } = newBCategory;

  useEffect(() => {
    if (getBlogCateId !== undefined) {
      dispatch(getABlogCategory(getBlogCateId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCateId]);
  useEffect(() => {
    if (isSuccess && createdBCate) {
      toast.success("Blog Category Added Successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedBCate) {
      toast.success("Blog Category Name updated Successfully!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Blog Category went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCateName || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Blog Category is Required"),
    }),
    onSubmit: (values) => {
      if (getBlogCateId !== undefined) {
        const data = { id: getBlogCateId, blogCateData: values };
        dispatch(updateABlogCategory(data));
      } else {
        dispatch(createBCategory(values));
        // toast.success("Brand Add Successfully!");
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }

      // alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCateId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
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
            {getBlogCateId !== undefined ? "Edit" : "Add"} Blog Cate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
