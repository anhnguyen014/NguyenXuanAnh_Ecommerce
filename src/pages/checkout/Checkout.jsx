import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import watch from "../../images/smartwatch.jpg";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { createAOrder } from "../../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  pincode: yup.number().required("Pincode is required"),
  // other: yup.string().required("Other is required"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  // console.log(paymentInfo, shippingInfo);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      country: "",
      city: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 600);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    console.log(shippingInfo);
  };

  const cartState = useSelector((state) => state.auth.cartProducts);
  // console.log(cartState);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index]?.price;
      //
      setTotalAmount(sum);
    }
  }, [cartState]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      // console.log(cartState[index]);
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, [cartState]);
  // console.log();
  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: totalAmount + 50000 },
      config
    );
    if (!result) {
      alert("Checkout failed");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    // console.log(amount);
    const options = {
      key: "rzp_test_hXQ6AEK6v078B8", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Dev Anh",
      description: "Test Transaction",

      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:5000/api/user/order/payment-verification",
          data,
          config
        );
        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });

        dispatch(
          createAOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo,
            shippingInfo,
          })
        );
      },

      prefill: {
        name: "Dev Anh",
        email: "anhnguyen.100499@gmail.com",
        contact: "0333853839",
      },
      notes: {
        address: "Dev Anh Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb title="Checkout" />
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">DEV Anh</h3>
              <nav
                style={{ "-bsBreadcrumbDivider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item ">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>

                  <li
                    className="breadcrumb-item  total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  <li className="breadcrumb-item  total-price active">
                    Shipping
                  </li>

                  <li
                    className="breadcrumb-item  total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Thong tin lien he</h4>
              <p className="user-details">Anh (anhnguyen.100499@gmail.com)</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    id="country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    className="form-control form-select"
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="Viet Nam">Viet Nam</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                </div>
                <div className="error ms-2 my-1">
                  {formik.touched.address && formik.errors.address}
                </div>
                <div className="w-100">
                  <input
                    id="other"
                    type="text"
                    className="form-control"
                    placeholder="Apartment, Suite, etc"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                {/* <div className="error ms-2 my-1">
                  {formik.touched.other && formik.errors.other}
                </div> */}
                <div className="flex-grow-1">
                  <input
                    id="city"
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <select
                    id="state"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    className="form-control form-select"
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="hanoi">Ha Noi</option>
                  </select>
                  <div className="error ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    id="pincode"
                    type="text"
                    className="form-control"
                    placeholder="ZipCode"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <MdOutlineArrowBackIosNew className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button border-0" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-4 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{ top: "-14px", right: "-5px" }}
                            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            className="img-fluid"
                            src={
                              item?.productId?.images[0].url
                                ? item?.productId?.images[0].url
                                : watch
                            }
                            alt="watch"
                          />
                        </div>
                        <div>
                          <h5 className="total">{item?.productId?.title}</h5>
                          <div>
                            <ul className="colors ps-0">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              ></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total-price">
                          {item?.price * item?.quantity} VND
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">
                  {totalAmount ? totalAmount : 0} VND
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price"> 50000 VND</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                {totalAmount ? totalAmount + 50000 : 0} VND
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
