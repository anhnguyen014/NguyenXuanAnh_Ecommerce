import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrand, resetState } from "../../features/brand/brandSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand } = newBrand;
  useEffect(() => {
    if (isSuccess && createdBrand) {
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
      title: Yup.string().required("Brand is Required"),
    }),
    onSubmit: (values) => {
      dispatch(createBrand(values));
      // toast.success("Brand Add Successfully!");
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/brand-list");
      }, 3000);
      // alert(JSON.stringify(values));
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Enter Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
            id="brand"
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
