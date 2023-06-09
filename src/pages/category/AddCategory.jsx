import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";

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
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPCategoryId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getPCategoryId !== undefined) {
      dispatch(getAPCategory(getPCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getPCategoryId]);
  // console.log(getPCategoryId);
  const imgState = useSelector((state) => state.upload.images);

  const newCategory = useSelector((state) => state.pcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    pCategoryName,
    pCategoryImages,
    updatedPCategory,
  } = newCategory;

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
      title: pCategoryName || "",
      images: pCategoryImages || "",
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
        {getPCategoryId !== undefined ? "Cập nhật" : "Thêm"} danh mục
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Nhập danh mục"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
          />
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
            {getPCategoryId !== undefined ? "Cập nhật" : "Thêm"} danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
