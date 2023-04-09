import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  getProducts,
} from "../../features/product/productSlice";
import Link from "antd/es/typography/Link";
import axios from "axios";
import { useParams } from "react-router-dom";
import { base_url } from "../../utils/base-_url";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  // {
  //   title: "Color",
  //   dataIndex: "color",
  // },

  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, props.productId]);

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

      price: `${productState[i].price}`,
      action: (
        <>
          <Link className=" fs-4 text-success" to="/">
            <FiEdit />
          </Link>
          <Link className="ms-3 fs-4 text-danger" to="">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
