import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import watch from "../../images/smartwatch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  console.log(userCartState);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
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

                        <p className="d-flex gap-3">
                          Color:{" "}
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item?.productId?.price} VND</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          name=""
                          min={1}
                          max={10}
                          id=""
                          value={item?.quantity}
                        />
                      </div>
                      <div>
                        <AiFillDelete className="text-danger fs-5" />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        {item?.price * item?.quantity} VND
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ 100</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
