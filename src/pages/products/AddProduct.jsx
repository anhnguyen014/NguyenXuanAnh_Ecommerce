import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  createProduct,
  getOneProduct,
  resetState,
  updateAProduct,
} from "../../features/product/productSlice";
import { toast } from "react-toastify";
// import { InboxOutlined } from "@ant-design/icons";
// import { message, Upload } from "antd";
// const { Dragger } = Upload;

// onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];

  const [color, setColor] = useState([]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getOneProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

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
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productName,
    productPrice,
    productDescription,
    productImage,
    productCategory,
    productBrand,
    productColor,
    productQuantity,
    updatedProduct,
    productTags,
  } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Add Successfully!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfully!");
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct, updatedProduct]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: (
        <div className="d-flex align-items-center gap-3">
          <p>{i?.title}</p>
          <ul className="colors ps-0">
            <li
              style={{
                backgroundColor: i?.title,
              }}
            ></li>
          </ul>
        </div>
      ),
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
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      description: productDescription || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      quantity: productQuantity || "",
      color: productColor || "",
      images: productImage || "",
      tags: productTags || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),
      color: Yup.array()
        .min(1, "Pick at least one color")
        .required("Color is Required"),
      description: Yup.string().required("Description is Required"),
      price: Yup.number().required("Price is Required"),
      quantity: Yup.number().required("Quantity is Required"),
      brand: Yup.string().required("Brand is Required"),
      category: Yup.string().required("Category is Required"),
      tags: Yup.string().required("Tags is Required"),
    }),
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        console.log(data);
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProduct(values));
        formik.resetForm();
        setColor(null);
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
        // alert(JSON.stringify(values));
      }
    },
    // toast.success("Product Update Successfully!");
  });
  const handleColor = (e) => {
    setColor(e);
    console.log(color);
  };
  return (
    <div>
      <h3 className=" title">
        {getProductId !== undefined ? "Cập nhật" : "Thêm"} sản phẩm
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            placeholder="Nhập tên sản phẩm"
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
            placeholder="Nhập giá"
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
            <option value="">Chọn hãng </option>
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
            <option value="">Chọn danh mục</option>
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
              Chọn tags
            </option>
            <option value="featured">Đặc sắc</option>
            <option value="popular">Phổ biến</option>
            <option value="special">Đặc biệt</option>
          </select>
          <div className="error ">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Chọn màu"
            defaultValue={color}
            onChange={(i) => handleColor(i)}
            options={coloropt}
          />
          <div className="error ">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            placeholder="Nhập số lượng"
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
                    <p>Kéo 'và' thả một số tệp vào đây hoặc nhấp để chọn tệp</p>
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
            {getProductId !== undefined ? "Cập nhật" : "Thêm"} Sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
