import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import watch from "../images/smartwatch.jpg";
import watch2 from "../images/smartwatch1.avif";
import prodCompare from "../images/prodcompare.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  console.log(data);
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
            <Link to="/product/:id" className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent">
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0].url}
                  className="img-fluid"
                  alt="product_image"
                />
                <img
                  src={watch2}
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
                  value={item?.totalRating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">$ {item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodCompare} alt="prodcompare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
