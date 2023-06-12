import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import {
  deleteOnePromotion,
  getPromotions,
  resetState,
} from "../../features/promotion/promotionSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    // sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    // sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "startDate",
  },

  {
    title: "Ngày kết thúc",
    dataIndex: "endDate",
  },
  {
    title: "Giảm giá ",
    dataIndex: "discount",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const PromotionList = () => {
  const [open, setOpen] = useState(false);
  const [promotionId, setPromotionId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPromotionId(e);
  };
  console.log(promotionId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getPromotions());
  }, []);
  const promotionState = useSelector((state) => state?.promotion.promotions);
  const data1 = [];

  for (let i = 0; i < promotionState?.length; i++) {
    data1.push({
      key: i + 1,
      status: promotionState[i].status,
      startDate: promotionState[i].startDate,
      endDate: promotionState[i].endDate,
      discount: promotionState[i].discount,
      name: promotionState[i]?.productID[0]?.title,

      //   images: (
      //     <img
      //       src={promotionState[i]?.images[0]?.url}
      //       alt=""
      //       className="w-25 img-fluid"
      //     />
      //   ),

      action: (
        <>
          <Link
            to={`/admin/promotion/${promotionState[i]._id}`}
            className=" fs-4 text-success"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(promotionState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deletePromotion = (e) => {
    dispatch(deleteOnePromotion(e));
    setTimeout(() => {
      dispatch(getPromotions());
    }, 50);
    setOpen(false);
  };
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4 title">Danh sách sản phẩm khuyến mãi</h3>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Tìm sản phẩm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data1?.filter((promotionState) => {
            return search.toLowerCase() === ""
              ? promotionState
              : promotionState.name.toLowerCase().includes(search);
          })}
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletePromotion(promotionId);
        }}
        title="Bạn muốn xoá sản phẩm này khỏi danh sách?"
      />
    </div>
  );
};

export default PromotionList;
