import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import watch from "../../images/smartwatch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../../features/user/userSlice";

const Cart = () => {
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
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  // console.log(totalAmount);

  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);
  // console.log(userCartState);
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      // console.log(productUpdateDetail.caItemId);
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 200);
    }
  }, [productUpdateDetail]);
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) * userCartState[index]?.price;
      //
      setTotalAmount(sum);
    }
  }, [userCartState]);

  // console.log(quantity);

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Giỏ hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Sản phẩm</h4>
              <h4 className="cart-col-2">Giá</h4>
              <h4 className="cart-col-3">Số lượng</h4>
              <h4 className="cart-col-4">Tổng tiền</h4>
            </div>
            {userCartState && userCartState?.length === 0 && (
              <div>
                <h3 className="text-center py-5">Giỏ hàng của bạn trống</h3>
              </div>
            )}
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={
                            item?.productId?.images[0]?.url
                              ? item?.productId?.images[0]?.url
                              : watch
                          }
                          className="img-fluid"
                          alt="watch"
                        />
                      </div>
                      <div className="w-75 ms-5">
                        <p>{item?.productId?.title}</p>

                        <div className="d-flex gap-3">
                          <p>Color:</p>

                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price text-danger">
                        {item?.productId?.price?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          name={"quantity" + item?._id}
                          min={1}
                          max={10}
                          id={"cart" + item?._id}
                          value={item?.quantity}
                          onChange={(e) => {
                            // console.log(item?._id);
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => deleteACartProduct(item?._id)}
                          className="text-danger fs-5"
                        />
                      </div>
                    </div>

                    <div className="cart-col-4">
                      <h5 className="price text-danger">
                        {(item?.price * item?.quantity).toLocaleString(
                          "vi-VN",
                          { style: "currency", currency: "VND" }
                        )}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Tiếp tục mua sắm
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>
                    Tổng phụ thu:
                    <span className="text-danger">
                      {totalAmount?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </h4>
                  <p>Phí và vận chuyển khi thanh toán</p>
                  <Link to="/checkout" className="button">
                    Thanh toán
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
