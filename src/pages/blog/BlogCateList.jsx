import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBCategories } from "../../features/bcategory/bcategorySlice";
import Link from "antd/es/typography/Link";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
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
  const dispatch = useDispatch();
  useEffect(() => {
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
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogCateList;
