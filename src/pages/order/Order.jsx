import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrder } from "../../features/user/userSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getOrderedProduct?.orders
  );
  //   console.log(orderState);

  useEffect(() => {
    dispatch(getMyOrder());
  }, []);
  return (
    <>
      <Meta title={"My Order"} />
      <BreadCrumb title="Đơn hàng của bạn" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Mã đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền sau giảm giá</h5>
              </div>
              <div className="col-3">
                <h5>Trạng thái</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div
                    style={{ backgroundColor: "#febd69" }}
                    className="row pt-3 my-3"
                    key={index}
                  >
                    <div className="col-3">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>
                        {item?.totalPrice?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    <div className="col-3">
                      <p>
                        {item?.totalPriceAfterDiscount?.toLocaleString(
                          "vi-VN",
                          { style: "currency", currency: "VND" }
                        )}
                      </p>
                    </div>
                    <div className="col-3">
                      <p>{item?.orderStatus}</p>
                    </div>
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
                                  <p className="text-white">{i?.quantity}</p>
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
                                            backgroundColor: i?.color?.title,
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
      </Container>
    </>
  );
};

export default Order;
