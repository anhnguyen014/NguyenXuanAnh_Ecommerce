import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addToWishList,
  getAllProduct,
  getProductByCate,
} from "../../features/products/productSlice";
import Container from "../../components/Container";
import wish from "../../images/wish.svg";
import view from "../../images/view.svg";
import ReactStars from "react-rating-stars-component";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";

const ProductCate = () => {
  const location = useLocation();
  const getCategory = location.pathname.split("/")[3];
  console.log(getCategory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductByCate(getCategory));
  }, []);
  const addToWhish = (id) => {
    // alert(id);
    dispatch(addToWishList(id));
    // console.log(id);
  };
  const productState = useSelector(
    (state) => state?.product?.productByCategory
  );

  return (
    <>
      <Meta title={"Product Details"} />
      <BreadCrumb title={decodeURIComponent(getCategory)} />
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <h3 className="section-heading text-uppercase mb-0">
              {decodeURIComponent(getCategory)}
            </h3>
            <h6 className="mb-0 ">{productState?.length} Sản phẩm</h6>
          </div>
          <hr />
          {productState &&
            productState?.map((item, index) => {
              console.log(item._id);
              return (
                <div key={index} className="col-3 mt-4">
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
            })}
        </div>
      </Container>
    </>
  );
};

export default ProductCate;
