import React from "react";
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

// import BreadCrumb from "../components/BreadCrumb";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
    getBlogs();
  }, []);
  const getProducts = () => {
    dispatch(getAllProduct());
  };
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  const addToWhish = (id) => {
    // alert(id);
    dispatch(addToWishList(id));
  };
  const productState = useSelector((state) => state?.product?.products);
  const blogState = useSelector((state) => state?.blog?.blogs);
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
              <Link className="button">BUY NOW</Link>
            </div>
          </div>
          <div className="col-6 ">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <div className="col-6 position-relative">
                <div className="small-banner p-3 ">
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                  />
                </div>
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>Laptop Max.</h5>
                  <p>
                    From $1500.00 or <br /> $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-6 position-relative ">
                <div className="small-banner p-3">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                  />
                </div>
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL.</h4>
                  <h5>Buy iPad.</h5>
                  <p>
                    From $2000.00 or <br /> $42.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-6 position-relative">
                <div className="small-banner p-3">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                  />
                </div>
                <div className="small-banner-content position-absolute">
                  <h4>15% OFF.</h4>
                  <h5>SmartWatch 7.</h5>
                  <p>
                    Shop the latest band <br /> styles and colors.
                  </p>
                </div>
              </div>
              <div className="col-6 position-relative">
                <div className="small-banner p-3">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner 1"
                  />
                </div>
                <div className="small-banner-content position-absolute">
                  <h4>FREE ENGRAVING.</h4>
                  <h5>AirPods Max.</h5>
                  <p>
                    High-fidelity playback & <br />
                    ultra-low distortion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
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
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between  flex-wrap align-items-center">
              <div className="d-flex  align-items-center py-2 ">
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
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
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
                        <img
                          src={
                            item?.images[1]?.url ? item?.images[1]?.url : watch2
                          }
                          className="img-fluid last"
                          alt="product_image"
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">{item?.title}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalRating}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">$ {item?.price}</p>
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
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
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
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
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
                    title={item?.title}
                    brand={item?.brand}
                    price={item?.price}
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
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item?.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
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
                        <img
                          src={
                            item?.images[1]?.url ? item?.images[1]?.url : watch2
                          }
                          className="product-image img-fluid last"
                          alt="product_image"
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">{item?.title}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalRating}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">$ {item.price}</p>
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
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marque-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
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
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState.map((item, index) => {
            if (index < 4) {
              return (
                <div className="col-3 d-flex gap-3 mb-4" key={index}>
                  <BlogCard
                    id={item?._id}
                    title={item?.title}
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
