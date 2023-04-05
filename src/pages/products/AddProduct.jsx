import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getBrands } from "../../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPCategories } from "../../features/pcategory/pcategorySlice";
import { getColors } from "../../features/color/colorSlice";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";

import { Select } from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { createProduct, resetState } from "../../features/product/productSlice";
import { toast } from "react-toastify";
// import { InboxOutlined } from "@ant-design/icons";
// import { message, Upload } from "antd";
// const { Dragger } = Upload;

// onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getPCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const pCateState = useSelector((state) => state.pcategory.pcategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);

  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Add Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const images = [];
  imgState.forEach((i) => {
    images.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = images;
  }, [color, images]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      color: "",
      images: "",
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),
      color: Yup.array()
        .min(1, "Pick at least one color")
        .required("Title is Required"),
      description: Yup.string().required("Description is Required"),
      price: Yup.number().required("Price is Required"),
      quantity: Yup.number().required("Quantity is Required"),
      brand: Yup.string().required("Brand is Required"),
      category: Yup.string().required("Category is Required"),
      tags: Yup.string().required("Tags is Required"),
    }),
    onSubmit: (values) => {
      dispatch(createProduct(values));
      // toast.success("Product Add Successfully!");
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      // alert(JSON.stringify(values));
    },
  });
  const handleColor = (e) => {
    setColor(e);
    console.log(color);
  };
  return (
    <div>
      <h3 className=" title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            placeholder="Enter Product Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error ">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="title">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error ">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Product Price"
            name="price"
            onCh={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className="error ">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 my-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error ">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {pCateState.map((i, j) => {
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
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error ">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select color"
            defaultValue={color}
            onChange={(i) => handleColor(i)}
            options={coloropt}
          />
          <div className="error ">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter Product Quantity"
            name="price"
            onCh={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />
          <div className="error ">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
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
          <div className="show d-flex flex-wrap gap-3">
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
