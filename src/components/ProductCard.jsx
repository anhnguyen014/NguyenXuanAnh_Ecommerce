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
  const { grid } = props;
  let location = useLocation();
  console.log(location);
  return (
    <>
      <div
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
            <img src={watch} className="img-fluid" alt="product_image" />
            <img src={watch2} className="img-fluid last" alt="product_image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Xiaomi</h6>
            <h5 className="product-title">
              Xiaomi Watch S1 46.5mm (Đồng hồ thông minh Xiaomi Watch S1 46.5mm)
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Xiaomi Watch S1 là chiếc smartwatch mới nhất được nhà Xiaomi cho
              ra mắt, với diện mạo vô cùng thanh lịch được nâng cấp về mặt thiết
              kế cũng như tính năng so với thế hệ trước.
            </p>
            <p className="price">$200.00</p>
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
      <div
        className={`${
          location.pathname === "/product" ? `gr-${grid}` : "col-3"
        }`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src={wish} alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src={watch} className="img-fluid" alt="product_image" />
            <img src={watch2} className="img-fluid last" alt="product_image" />
          </div>
          <div className="product-details">
            <h6 className="brand">Xiaomi</h6>
            <h5 className="product-title">
              Xiaomi Watch S1 46.5mm (Đồng hồ thông minh Xiaomi Watch S1 46.5mm)
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              Xiaomi Watch S1 là chiếc smartwatch mới nhất được nhà Xiaomi cho
              ra mắt, với diện mạo vô cùng thanh lịch được nâng cấp về mặt thiết
              kế cũng như tính năng so với thế hệ trước.
            </p>
            <p className="price">$200.00</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link>
                <img src={prodCompare} alt="prodcompare" />
              </Link>
              <Link>
                <img src={view} alt="view" />
              </Link>
              <Link>
                <img src={addcart} alt="addcart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
