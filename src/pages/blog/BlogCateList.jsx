import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlogCategory,
  getBCategories,
  resetState,
} from "../../features/bcategory/bcategorySlice";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";

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

const BlogCateList = () => {
  const [open, setOpen] = useState(false);
  const [blogCateId, setBlogCateId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogCateId(e);
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBCategories());
  }, []);
  const bcateState = useSelector((state) => state.bcategory.bcategories);
  const data1 = [];
  for (let i = 0; i < bcateState.length; i++) {
    data1.push({
      key: i + 1,
      name: bcateState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${bcateState[i]._id}`}
            className=" fs-4 text-success"
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(bcateState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCategory(e));
    setTimeout(() => {
      dispatch(getBCategories());
    }, 50);
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCateId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default BlogCateList;
