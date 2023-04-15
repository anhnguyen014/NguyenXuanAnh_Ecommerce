import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Color from "../../components/Color";
import ProductCard from "../../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../../features/products/productSlice";
import { toast } from "react-toastify";
import { addProductToCart } from "../../features/user/userSlice";

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  // console.log(getProductId);

  const dispatch = useDispatch();

  const [color, setColor] = useState(null);
  // console.log(color);
  const [quantity, setQuantity] = useState(1);
  // console.log(quantity);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
  }, [getProductId]);

  const productState = useSelector((state) => state.product.product);
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
    }
  };

  const props = {
    width: 400,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
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
  return (
    <>
      <Meta title={"Product Details"} />
      <BreadCrumb title="Product Details" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images.map((item, index) => {
                return (
                  <div>
                    <img src={item?.url} className="img-fluid" alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{productState?.price} VND</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalRating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 Reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="py-3 ">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type: </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand: </h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category: </h3>
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
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading ">Size: </h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading ">Color: </h3>
                  <Color setColor={setColor} colorData={productState?.color} />
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading ">Quantity: </h3>
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
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      type="button"
                      onClick={() => {
                        uploadCart();
                      }}
                    >
                      Them vao gio hang
                    </button>
                    <button className="button signup">Mua ngay</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" />
                      Add to wishlist
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add to compare
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Lorem ipsum dolor sit amet consectetur,{" "}
                    <b>adipisicing elit. Eveniet quam omnis numquam id</b>,
                    doloribus vitae corrupti porro aliquid molestias ad iusto,{" "}
                    <b>asperiores natus recusandae rerum</b> exercitationem unde
                    maiores similique obcaecati <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading mb-0">Product Link: </h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Lorem ipsum dolor sit amet consectetur,{" "}
                    <b>adipisicing elit. Eveniet quam omnis numquam id</b>,
                    doloribus vitae corrupti porro aliquid molestias ad iusto,{" "}
                    <b>asperiores natus recusandae rerum</b> exercitationem unde
                    maiores similique obcaecati <b>5-10 business days!</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper  home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
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
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-3">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {order && (
                  <div>
                    <Link to="" className="text-dark text-decoration-underline">
                      Write a reviews
                    </Link>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      className="w-100 form-control"
                      id=""
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Nguyen Xuan Anh</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    distinctio necessitatibus accusantium in, illum omnis fugiat
                    ab soluta ipsam sint cupiditate nostrum dolore ipsa non.
                    Rerum facilis possimus odit sint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
