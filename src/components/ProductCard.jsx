import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import watch from "../images/smartwatch.jpg";
import watch2 from "../images/smartwatch1.avif";
import prodCompare from "../images/prodcompare.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../features/products/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  // console.log(data);
  const addToWhish = (id) => {
    // alert(id);
    dispatch(addToWishList(id));
  };
  return (
    <>
      {data?.map((item, index) => {
        // console.log(item?.images[1]?.url);
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
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
              <div className="product-image" style={{ width: "202px" }}>
                <img
                  src={item?.images[0]?.url ? item?.images[0]?.url : watch}
                  className="image-product"
                  alt="product_image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">
                  {grid === 12 || grid === 6
                    ? item?.title
                    : item?.title?.substr(0, 30) + "..."}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalRating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
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
                  <Link
                    to={"/product/" + item?._id}
                    className="border-0 bg-transparent"
                  >
                    <img src={view} alt="view" />
                  </Link>
                  {/* <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
