import React, { useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import { getMyOrder } from "../../features/user/userSlice";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  mobile: yup.number().required("Mobile is required"),
});

const Profile = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    },
  };
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);

  const userState = useSelector((state) => state?.auth?.user);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(editUser({ data: values, config2: config2 }));
      setEdit(true);
      // console.log(userState.isSuccess);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    dispatch(getMyOrder());
  }, []);

  const orderState = useSelector(
    (state) => state?.auth?.getOrderedProduct?.orders
  );
  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="Thông tin khách hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="my-3">Cập nhật profile</h3>
                  <FiEdit className="fs-3" onClick={() => setEdit(false)} />
                </div>
              </div>
              <div className="col-12">
                <form action="" onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="example1" className="form-label">
                      Họ
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="example1"
                      disabled={edit}
                      name="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="example2" className="form-label">
                      Tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="example2"
                      disabled={edit}
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Địa chỉ email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      disabled={edit}
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Số điện thoại
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                      name="mobile"
                      disabled={edit}
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>

                  {edit === false && (
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="my-3 mx-5">Đơn hàng đã mua</h3>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-12 mt-3">
                  {orderState &&
                    orderState?.map((item, index) => {
                      return (
                        <div
                          style={{ backgroundColor: "#febd69" }}
                          className="row pt-3 my-3"
                          key={index}
                        >
                          <div
                            style={{ backgroundColor: "#232f3e" }}
                            className="col-12"
                          >
                            <div className="row  py-3">
                              <div className="col-3">
                                <h6 className="text-white">Tên sản phẩm</h6>
                              </div>
                              <div className="col-3">
                                <h6 className="text-white">Số lượng</h6>
                              </div>
                              <div className="col-3">
                                <h6 className="text-white">Giá</h6>
                              </div>
                              <div className="col-3">
                                <h6 className="text-white">Màu</h6>
                              </div>
                              {item?.orderItems?.map((i, index) => {
                                return (
                                  <div className="col-12" key={index}>
                                    <div className="row p-3">
                                      <div className="col-3">
                                        <p className="text-white">
                                          {i?.product?.title}
                                        </p>
                                      </div>
                                      <div className="col-3">
                                        <p className="text-white">
                                          {i?.quantity}
                                        </p>
                                      </div>
                                      <div className="col-3">
                                        <p className="text-white">
                                          {i?.price?.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          })}
                                        </p>
                                      </div>
                                      <div className="col-3">
                                        <div className="d-flex gap-3">
                                          <div>
                                            <ul className="colors ps-0">
                                              <li
                                                style={{
                                                  backgroundColor:
                                                    i?.color?.title,
                                                }}
                                              ></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
