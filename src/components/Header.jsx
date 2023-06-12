import React, { useEffect, useState } from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  getAProduct,
  getAllProduct,
  getProductByCate,
} from "../features/products/productSlice";
import { getUserCart } from "../features/user/userSlice";
import { getAllCategories } from "../features/categories/categorySlice";
import { AiOutlineLogout } from "react-icons/ai";
const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  const authState = useSelector((state) => state?.auth);
  const [total, setTotal] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const productState = useSelector((state) => state?.product?.products);
  const [productOpt, setProductOpt] = useState([]);
  const [categories, setCategories] = useState([]);

  //filter state
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();
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
  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  // console.log(cartState);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  useEffect(() => {
    let newCategories = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newCategories.push(element?.category);
    }
    setCategories(newCategories);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [category]);
  const getProducts = () => {
    dispatch(getAllProduct({ category }));
  };

  console.log([...new Set(categories)]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0"></p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Phone:
                <a className="text-white" href="tel:+84 333853839">
                  +84 333853839
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h1>
                <Link className="text-white" to="/">
                  DevAnh
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                    // window.location.reload();
                  }}
                  options={productOpt}
                  minLength={2}
                  labelKey={"name"}
                  paginate={paginate}
                  placeholder="Tìm kiếm sản phẩm ...."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Danh mục <br />
                      yêu thích
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Đăng nhập <br />
                        Tài khoản
                      </p>
                    ) : (
                      <p className="mb-0">
                        Xin chào <br />
                        {authState?.user?.firstname +
                          " " +
                          authState?.user?.lastname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <AiOutlineLogout className="me-2 text-white fs-4" />
                  <button
                    onClick={handleLogout}
                    className="border border-0 bg-transparent text-white text-uppercase"
                    type="button"
                  >
                    Đăng xuất
                  </button>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">
                        {total?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                          ? total?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : 0}{" "}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={menu} alt="menu" />
                        <span className="me-5 d-inline-block">
                          Danh mục sản phẩm
                        </span>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        {categories &&
                          [...new Set(categories)]?.map((item, index) => {
                            return (
                              <li key={index}>
                                <Link
                                  className="dropdown-item text-white"
                                  to={"/product/category/" + item}
                                  onClick={() => {
                                    dispatch(getProductByCate(item));
                                  }}
                                >
                                  {item}
                                </Link>
                              </li>
                            );
                          })}

                        {/* <li>
                          <Link className="dropdown-item text-white" to="">
                            Another action
                          </Link>
                        </li>

                        <li>
                          <Link className="dropdown-item text-white" to="">
                            Something else here
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="menu-links ">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/product">Sản phẩm</NavLink>
                    <NavLink to="/blog">Tin tức</NavLink>
                    <NavLink to="/contact">Liên hệ</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
