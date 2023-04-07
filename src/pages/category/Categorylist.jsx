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
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
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
  return (
    <div>
      <h3 className="mb-4 title">Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletePCategory(pCategoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default Categorylist;
