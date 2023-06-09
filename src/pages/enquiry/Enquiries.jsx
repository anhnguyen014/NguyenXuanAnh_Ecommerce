import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/enquirySlice";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import { Link } from "react-router-dom";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "mobile",
  },
  {
    title: "Bình luận",
    dataIndex: "comment",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
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

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnqId(e);
  };
  // console.log(enqId);
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select
            name=""
            id=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submitted"
            }
            className="form-control form-select"
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submitted">Đã gửi</option>
            <option value="Contacted">Đã liên hệ</option>
            <option value="In Progress">Trong tiến trình</option>
            <option value="Resolved">Đã giải quyết</option>
          </select>
        </>
      ),
      date: new Date(enquiryState[i].createdAt).toLocaleString(),

      action: (
        <>
          <Link
            className="ms-3 fs-4 text-info"
            to={`/admin/enquiry/${enquiryState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    // console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 50);
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Liên hệ</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnquiry(enqId);
        }}
        title="Bạn muốn xoá liên hệ này ra khỏi danh sách?"
      />
    </div>
  );
};

export default Enquiries;
