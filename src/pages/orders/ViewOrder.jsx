import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAOrderByUser, getOrders } from "../../features/auth/authSlice";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
// import { getOrders } from "../../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getAOrderByUser(userId));
  }, [userId]);
  const orderState = useSelector(
    (state) => state.auth?.orderByUser[0]?.products
  );
  console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.title,
      brand: orderState[i].product.brand,
      count: orderState[i].count,
      price: orderState[i].product.price,
      color: orderState[i].product.color[0],
      date: new Date(orderState[i].product.createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
