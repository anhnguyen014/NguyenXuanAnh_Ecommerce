import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import Meta from "../../components/Meta";

const WishList = () => {
  return (
    <>
      <Meta title={"WishList"} />
      <BreadCrumb title="WishList" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute img-fluid cross"
              />
              <div className="wishlist-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
            </div>
            <div className="py-3">
              <h5 className="title-1">
                Apple Watch Series 7 GPS 41mm (Apple Watch Series 7 GPS 41mm
                viền nhôm dây silicone)
              </h5>
              <h6 className="price-1">$300</h6>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute img-fluid cross"
              />
              <div className="wishlist-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
            </div>
            <div className="py-3">
              <h5 className="title-1">
                Apple Watch Series 7 GPS 41mm (Apple Watch Series 7 GPS 41mm
                viền nhôm dây silicone)
              </h5>
              <h6 className="price-1">$300</h6>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute img-fluid cross"
              />
              <div className="wishlist-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
            </div>
            <div className="py-3">
              <h5 className="title-1">
                Apple Watch Series 7 GPS 41mm (Apple Watch Series 7 GPS 41mm
                viền nhôm dây silicone)
              </h5>
              <h6 className="price-1">$300</h6>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WishList;
