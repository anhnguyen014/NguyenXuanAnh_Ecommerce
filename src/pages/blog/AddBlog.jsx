import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../../features/blog/blogSlice";
import { getBCategories } from "../../features/bcategory/bcategorySlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(getBCategories());
  }, []);

  const imgState = useSelector((state) => state.upload.images);
  const bCateState = useSelector((state) => state.bcategory.bcategories);

  const newBlog = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    updatedBlog,
    blogImage,
    blogCategory,
    blogDesc,
    blogName,
  } = newBlog;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Add Successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog updated Successfully!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);

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
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: blogImage || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),

      description: Yup.string().required("Description is Required"),

      category: Yup.string().required("Category is Required"),
    }),
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        console.log(data);
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        // toast.success("Product Add Successfully!");
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 300);
        // alert(JSON.stringify(values));
      }
    },
  });
  const [value, setValue] = useState("");
  const handleValue = (e) => {
    setValue(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              placeholder="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              value={formik.values.title}
            />
          </div>
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mt-4 "
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCateState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error ">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            className="mt-4"
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error ">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-4">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
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
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
