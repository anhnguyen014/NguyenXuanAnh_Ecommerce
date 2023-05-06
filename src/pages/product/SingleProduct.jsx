import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Color from "../../components/Color";
import ProductCard from "../../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  addToWishList,
  getAProduct,
} from "../../features/products/productSlice";
import { toast } from "react-toastify";
import { addProductToCart, getUserCart } from "../../features/user/userSlice";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  // console.log(getProductId);

  const dispatch = useDispatch();

  const [color, setColor] = useState(null);
  // console.log(color);
  const [quantity, setQuantity] = useState(1);
  // console.log(quantity);

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, []);

  const productState = useSelector((state) => state?.product?.product);
  const userCartState = useSelector((state) => state.auth.cartProducts);
  // console.log(userCartState.length);
  useEffect(() => {
    for (let index = 0; index < userCartState?.length; index++) {
      if (getProductId === userCartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);
  // console.log(productState);

  const uploadCart = () => {
    // alert("Added to cart");
    if (color === null) {
      toast.error("Please select a color");
      return false;
    } else {
      dispatch(
        addProductToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      navigate("/cart");
    }
  };

  const [order, setOrder] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const productPopularState = useSelector((state) => state?.product?.products);
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productPopularState.length; index++) {
      const element = productPopularState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productPopularState]);

  //rating

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingProduct = () => {
    if (star === null) {
      toast.error("Please select star a rating");
      return false;
    } else if (comment === null) {
      toast.error("Please enter your comment");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  const addToWhish = (id) => {
    // alert(id);
    dispatch(addToWishList(id));
  };

  return (
    <>
      <Meta title={"Product Details"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <Carousel
              showArrows={true}
              showStatus={false}
              showIndicators={false}
            >
              {productState?.images.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item?.url} alt="product" className="img-fluid" />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price text-danger">
                  {productState?.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalRating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">
                    ( {productState?.ratings?.length} Đánh giá )
                  </p>
                </div>
                <a className="review-btn" href="#review">
                  Viết đánh giá
                </a>
              </div>
              <div className="py-3 ">
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type: </h3>
                  <p className="product-data">Watch</p>
                </div> */}
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Hãng: </h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Loại: </h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading ">Tags: </h3>
                  <p className="product-data ">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading ">Availablity: </h3>
                  <p className="product-data ">In Stock</p>
                </div>

                {alreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading ">Color: </h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}

                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <div className="d-flex align-items-center gap-30 ms-5">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading ">Số lượng: </h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={10}
                            className="form-control"
                            style={{ width: "70px" }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                      </>
                    )}
                    <div
                      className={
                        alreadyAdded
                          ? "ms-0"
                          : "ms-5" + "d-flex align-items-center gap-30 ms-5"
                      }
                    >
                      <button
                        className="button border-0"
                        type="button"
                        onClick={() => {
                          alreadyAdded ? navigate("/cart") : uploadCart();
                        }}
                      >
                        {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ hàng"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <Link
                      onClick={(e) => {
                        addToWhish(productState?._id);
                      }}
                    >
                      <AiOutlineHeart className="fs-5 me-2" />
                      Thêm vào yêu thích
                    </Link>
                  </div>
                  {/* <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add to compare
                    </a>
                  </div> */}
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Vận chuyển và trả lại: </h3>
                  <p className="product-data">
                    Lorem ipsum dolor sit amet consectetur,{" "}
                    <b>adipisicing elit. Eveniet quam omnis numquam id</b>,
                    doloribus vitae corrupti porro aliquid molestias ad iusto,{" "}
                    <b>asperiores natus recusandae rerum</b> exercitationem unde
                    maiores similique obcaecati <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading mb-0">Link sản phẩm: </h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Nhấn vào để lấy link
                  </a>
                </div>
                {/* <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Lorem ipsum dolor sit amet consectetur,{" "}
                    <b>adipisicing elit. Eveniet quam omnis numquam id</b>,
                    doloribus vitae corrupti porro aliquid molestias ad iusto,{" "}
                    <b>asperiores natus recusandae rerum</b> exercitationem unde
                    maiores similique obcaecati <b>5-10 business days!</b>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper  home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Mô tả</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Nhận xét</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-3">Phản hồi khách hàng</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalRating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">
                      Dựa trên {productState?.ratings?.length} đánh giá
                    </p>
                  </div>
                </div>
                {order && (
                  <div>
                    <Link to="" className="text-dark text-decoration-underline">
                      Viết đánh giá
                    </Link>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Viết đánh giá</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    className="w-100 form-control"
                    id=""
                    cols="30"
                    rows="4"
                    placeholder="Viết nhận xét ..."
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={addRatingProduct}
                    className="button mt-3"
                    type="button"
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">{}</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến</h3>
          </div>
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
