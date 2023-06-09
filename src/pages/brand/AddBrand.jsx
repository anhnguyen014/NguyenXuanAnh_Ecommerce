import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";

import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../../features/brand/brandSlice";

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  const imgState = useSelector((state) => state.upload.images);

  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    brandImage,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Add Successfully!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand updated Successfully!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand]);

  const images = [];
  imgState.forEach((i) => {
    images.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = images;
  }, [images]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
      images: brandImage || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),
    }),
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        // alert(JSON.stringify(data));
        dispatch(updateABrand(data));
        // console.log(data);
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        // toast.success("Product Add Successfully!");
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Nhập tên thương hiệu"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              value={formik.values.title}
            />
          </div>
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>

          <div className="bg-white border-1 p-5 text-center mt-4">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Kéo 'và' thả một số tệp vào đây hoặc nhấp để chọn tệp</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show d-flex flex-wrap gap-3 mt-4">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
