import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from "../../features/auth/authSlice";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { getOrders } from "../../features/auth/authSlice";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày",
    dataIndex: "date",
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>Hiển thị đơn hàng</Link>
      ),
      amount: (
        <p className="price text-dark mb-0">
          {orderState[i]?.totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),

      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) =>
              updateOrderStatus(orderState[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
          >
            <option value="Ordered" disabled selected>
              Đặt hàng
            </option>

            <option value="Processed">Xử lý</option>
            <option value="Shipped">Vận chuyển</option>
            <option value="Delivered">Đã giao hàng</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a, b) => {
    // console.log(a, b);
    dispatch(updateAOrder({ id: a, status: b }));
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách đơn hàng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Order;
