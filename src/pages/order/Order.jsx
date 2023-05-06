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
      <BreadCrumb title="My Order" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount after Discount</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
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
                          <h6 className="text-white">Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Price</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Color</h6>
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
