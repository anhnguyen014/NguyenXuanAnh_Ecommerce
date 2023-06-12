import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAPCategory,
  getPCategories,
  resetState,
} from "../../features/pcategory/pcategorySlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên danh mục",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Hình ảnh",
    dataIndex: "images",
  },

  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCategoryId, setPCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPCategoryId(e);
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getPCategories());
  }, []);
  const pcateState = useSelector((state) => state.pcategory.pcategories);
  const data1 = [];
  for (let i = 0; i < pcateState.length; i++) {
    data1.push({
      key: i + 1,
      name: pcateState[i].title,
      images: (
        <img
          src={pcateState[i]?.images[0]?.url}
          alt=""
          className="w-25 img-fluid"
        />
      ),
      action: (
        <>
          <Link
            to={`/admin/category/${pcateState[i]._id}`}
            className=" fs-4 text-success"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(pcateState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deletePCategory = (e) => {
    dispatch(deleteAPCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getPCategories());
    }, 100);
  };
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4 title">Danh sách sản phẩm</h3>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Tìm danh mục"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data1?.filter((pcateState) => {
            return search.toLowerCase() === ""
              ? pcateState
              : pcateState.name.toLowerCase().includes(search);
          })}
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletePCategory(pCategoryId);
        }}
        title="Bạn muốn xoá danh mục này ra khỏi danh sách?"
      />
    </div>
  );
};

export default Categorylist;
