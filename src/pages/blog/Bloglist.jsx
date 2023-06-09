import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABlog,
  getBlogs,
  resetState,
} from "../../features/blog/blogSlice";

import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên Blog",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Hình ảnh",
    dataIndex: "images",
  },

  {
    title: "Danh mục",
    dataIndex: "category",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  };
  // console.log(brandId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      images: (
        <img
          src={blogState[i]?.images[0]?.url}
          alt=""
          className="w-25 img-fluid"
        />
      ),

      category: blogState[i].category,
      action: (
        <>
          <Link
            className=" fs-4 text-success"
            to={`/admin/blog/${blogState[i]._id}`}
          >
            <FiEdit />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setTimeout(() => {
      dispatch(getBlogs());
    }, 50);
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách Blogs</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Bạn có muốn xoá Blog ra khỏi danh sách?"
      />
    </div>
  );
};

export default Bloglist;
