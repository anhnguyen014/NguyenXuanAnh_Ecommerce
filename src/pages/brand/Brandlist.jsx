import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetState,
} from "../../features/brand/brandSlice";
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
    title: "Tên thương hiệu",
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

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      images: (
        <img
          src={brandState[i]?.images[0]?.url}
          alt=""
          className="w-25 img-fluid"
        />
      ),

      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className=" fs-4 text-success"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setTimeout(() => {
      dispatch(getBrands());
    }, 50);
    setOpen(false);
  };
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h3 className="mb-4 title">Danh sách hãng</h3>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Tìm thương hiệu"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data1?.filter((brandState) => {
            return search.toLowerCase() === ""
              ? brandState
              : brandState.name.toLowerCase().includes(search);
          })}
        />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Bạn muốn xoá thương hiệu này khỏi danh sách?"
      />
    </div>
  );
};

export default Brandlist;
