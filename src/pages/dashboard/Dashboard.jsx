import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../../features/auth/authSlice";

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
    title: "Số lượng sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng giá",
    dataIndex: "price",
  },
  {
    title: "Tổng giá sau khuyến mãi",
    dataIndex: "dprice",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    let data = [];
    let monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i + 1,
        name:
          orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        dprice: orderState[i]?.totalPriceAfterDiscount.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },

    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },

    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Bảng điều khiển</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end bg-white p-3 flex-grow-1 rounded-3">
          <div>
            <p className="desc">Tổng thu nhập</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState &&
                yearlyDataState[0]?.amount?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Thu nhập trong năm(đến hôm nay) </p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end bg-white p-3 flex-grow-1 rounded-3">
          <div>
            <p className="desc">Tổng doanh thu</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.count} sản phẩm
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Số hàng bán trong năm(đến hôm nay)</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Thống kê thu nhập</h3>
          <div className="bg-white p-4">
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Thống kê doanh số</h3>
          <div className="bg-white p-4">
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Đơn đặt hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
