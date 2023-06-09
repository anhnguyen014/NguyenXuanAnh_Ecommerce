import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { getAOrderByUser, getOrders } from "../../features/auth/authSlice";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder } from "../../features/auth/authSlice";
// import { getOrders } from "../../features/auth/authSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Hãng",
    dataIndex: "brand",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Màu",
    dataIndex: "color",
  },
  {
    title: "Tổng tiền",
    dataIndex: "price",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  // console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.quantity,
      price: (
        <p className="price text-dark mb-0">
          {orderState?.orderItems[i]?.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
      color: (
        <div>
          <ul className="colors ps-0">
            <li
              style={{
                backgroundColor: orderState?.orderItems[i]?.color?.title,
              }}
            ></li>
          </ul>
        </div>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Thông tin đơn hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
