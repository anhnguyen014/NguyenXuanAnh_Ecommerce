import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProduct,
  getProducts,
  resetState,
} from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../components/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
  },
  {
    title: "Hãng",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Sản phẩm",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  // console.log(productId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      image: (
        <>
          <img
            src={productState[i].images[0] && productState[i].images[0].url}
            className="img-fluid img-product"
            alt=""
          />
        </>
      ),
      brand: productState[i].brand,
      category: productState[i].category,
      // color: productState[i]._id,

      price: (
        <p className="price text-dark mb-0">
          {productState[i]?.price?.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
      action: (
        <>
          <Link
            className=" fs-4 text-success"
            to={`/admin/product/${productState[i]._id}`}
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setTimeout(() => {
      dispatch(getProducts());
    }, 50);
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Bạn muốn xoá sản phẩm này ra khỏi danh sách?"
      />
    </div>
  );
};

export default Productlist;
