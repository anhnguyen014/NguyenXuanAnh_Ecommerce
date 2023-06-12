import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../../components/BlogCard";
import ProductCard from "../../components/ProductCard";
import SpecialProduct from "../../components/SpecialProduct";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { serveice } from "../../utils/Data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  getAllProduct,
} from "../../features/products/productSlice";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";
import wish from "../../images/wish.svg";
import watch2 from "../../images/smartwatch1.avif";
import prodCompare from "../../images/prodcompare.svg";
import addcart from "../../images/add-cart.svg";
import view from "../../images/view.svg";
import ReactStars from "react-rating-stars-component";
import { getBrands } from "../../features/brands/brandSlice";
import { getAllCategories } from "../../features/categories/categorySlice";

// import BreadCrumb from "../components/BreadCrumb";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
    getBlogs();
    getAllBrand();
    getCategories();
  }, []);
  const getProducts = () => {
    dispatch(getAllProduct());
  };
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getAllBrand = () => {
    dispatch(getBrands());
  };

  const getCategories = () => {
    dispatch(getAllCategories());
  };
  const addToWhish = (id) => {
    // alert(id);
    dispatch(addToWishList(id));
  };
  const productState = useSelector((state) => state?.product?.products);
  const blogState = useSelector((state) => state?.blog?.blogs);
  const brandState = useSelector((state) => state?.brand?.brands);
  const categoryState = useSelector((state) => state?.category?.categories);

  const [noOfElements, setNoOfElements] = useState(9);
  const [noOfElements1, setNoOfElements1] = useState(7);
  const [noOfElements2, setNoOfElements2] = useState(4);

  const loadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };
  const loadMore1 = () => {
    setNoOfElements1(noOfElements1 + noOfElements1);
  };

  return (
    <>
      <Meta title={"E-commerce"} />
      <Container class1="home-wrapper-1 py-5">
        <div className="row ">
          <div className="col-6 position-relative">
            <div className="main-banner p-2 ">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3 mt-1"
                alt="main banner 1"
              />
            </div>
            <div className="main-banner-content position-absolute">
              <h4>SUPERCHARGED FOR PROS.</h4>
              <h5>iPhone 14 Pro Max.</h5>
              <p>From $1500.00 or $41.62/mo.</p>
              <Link to="/product" className="button">
                Mua ngay
              </Link>
            </div>
          </div>
          <div className="col-6 ">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              {categoryState &&
                categoryState
                  ?.slice(0, noOfElements2)
                  ?.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className="col-6 position-relative"
                        onClick={() =>
                          navigate(`product/category/${category?.title}`)
                        }
                      >
                        <div className="small-banner p-3 ">
                          <img
                            src={category?.images[1]?.url}
                            className="img-fluid rounded-3"
                            alt="main banner 1"
                          />
                        </div>
                        <div className="small-banner-content position-absolute">
                          <h5>{category?.title}</h5>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {serveice?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.tagline} alt="services" />
                    <div>
                      <h6>{i.image}</h6>
                      <p className="mb-0 ">{i.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between  flex-wrap align-items-center">
              {categoryState &&
                categoryState?.map((category, index) => {
                  return (
                    <div
                      onClick={() =>
                        navigate(`product/category/${category?.title}`)
                      }
                      key={index}
                      className="d-flex align-items-center py-2 mouse"
                    >
                      <div>
                        <h6>{category?.title}</h6>
                      </div>
                      <img
                        src={category?.images[0]?.url}
                        alt="category"
                        width={60}
                        height={60}
                      />
                    </div>
                  );
                })}

              {/* <div className="d-flex  align-items-center py-2">
                <div>
                  <h6>Smart Phones</h6>
                  <p>10 Items</p>
                </div>
                <img
                  className="smart"
                  src="images/smartphone2.jpg"
                  alt="smartphone"
                />
              </div>
              <div className="d-flex  align-items-center py-2">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex align-items-center py-2">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img
                  className="smart"
                  src="images/smartwatch.jpg"
                  alt="watch"
                />
              </div>
              <div className="d-flex align-items-center py-2">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex  align-items-center py-2">
                <div>
                  <h6>Smart Phones</h6>
                  <p>10 Items</p>
                </div>
                <img
                  className="smart"
                  src="images/smartphone2.jpg"
                  alt="smartphone"
                />
              </div>
              <div className="d-flex  align-items-center py-2">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex align-items-center py-2">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img
                  className="smart"
                  src="images/smartwatch.jpg"
                  alt="watch"
                />
              </div> */}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">Sản Phẩm Nổi Bật</h3>
          </div>
          {productState?.slice(0, noOfElements) &&
            productState?.slice(0, noOfElements)?.map((item, index) => {
              if (item?.tags === "featured") {
                return (
                  <div key={index} className="col-3 mb-3">
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            addToWhish(item?._id);
                          }}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid"
                          alt="product_image"
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 30) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalRating}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price text-danger">
                          {item?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodCompare} alt="prodcompare" />
                          </button> */}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          <button className="btn button w-100 mt-4" onClick={() => loadMore()}>
            Xem thêm
          </button>
        </div>
      </Container>
      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row gap-10">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="/images/famous.jpg"
                className="img-fluid famous-image"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or 16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3 bg-white famous-image-2 ">
            <div className="famous-card-1 position-relative">
              <img
                src="/images/famous-2.jpg"
                className=" img-fluid famous-image-2 "
                alt="famous"
              />
              <div className="famous-content-1 position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or 16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3 bg-white famous-image-2 ">
            <div className="famous-card-1 position-relative">
              <img
                src="/images/famous-2.jpg"
                className=" img-fluid famous-image-2 "
                alt="famous"
              />
              <div className="famous-content-1 position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or 16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3 bg-white famous-image-2 ">
            <div className="famous-card-1 position-relative">
              <img
                src="/images/famous-2.jpg"
                className=" img-fluid famous-image-2 "
                alt="famous"
              />
              <div className="famous-content-1 position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or 16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Sản Phẩm Đặc Biệt
            </h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title?.substr(0, 35) + "..."}
                    brand={item?.brand}
                    price={item?.price?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                    images={item?.images[0]?.url}
                    totalRating={item?.totalRating}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Sản Phẩm Phổ Biến
            </h3>
          </div>
          {productState?.slice(0, noOfElements1) &&
            productState?.slice(0, noOfElements1)?.map((item, index) => {
              if (item?.tags === "popular") {
                return (
                  <div key={index} className={"col-3 mb-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            addToWhish(item?._id);
                          }}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid"
                          alt="product_image"
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 30) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalRating}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price text-danger">
                          {item?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodCompare} alt="prodcompare" />
                          </button> */}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("/product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          <button className="btn button w-100 mt-4" onClick={() => loadMore1()}>
            Xem thêm
          </button>
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marque-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                {brandState &&
                  brandState?.map((item, index) => {
                    return (
                      <div key={index} className="mx-4 w-25">
                        <img src={item?.images[0]?.url} alt="brand" />
                      </div>
                    );
                  })}

                {/* <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div> */}
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Bài Viết Mới Nhất
            </h3>
          </div>
        </div>
        <div className="row">
          {blogState.map((item, index) => {
            if (index < 4) {
              return (
                <div className="col-3 d-flex gap-3 mb-4" key={index}>
                  <BlogCard
                    id={item?._id}
                    title={item?.title?.substr(0, 30) + "..."}
                    description={item?.description}
                    images={item?.images[0]?.url}
                    date={moment(item?.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                </div>
              );
            }
          })}
        </div>
      </Container>
    </>
  );
};

export default Home;
