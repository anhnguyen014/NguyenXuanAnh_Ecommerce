import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import Meta from "../../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../../features/user/userSlice";
import { addToWishList } from "../../features/products/productSlice";

const WishList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWishList());
  }, []);

  const wishListState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removeWishList = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserWishList());
    }, 300);
  };

  return (
    <>
      <Meta title={"WishList"} />
      <BreadCrumb title="WishList" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishListState && wishListState?.length === 0 && (
            <div className="text-center fs-3">
              <img
                src="../../images/empty-cart.jpg"
                width={500}
                height={500}
                alt=""
              />
            </div>
          )}
          {wishListState &&
            wishListState.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      onClick={() => removeWishList(item?._id)}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute img-fluid cross"
                    />
                    <div className="wishlist-card-image bg-white ">
                      <img
                        src={
                          item?.images[0].url
                            ? item?.images[0].url
                            : "images/watch.jpg"
                        }
                        className="img-fluid d-block mx-auto"
                        alt="watch"
                        width={160}
                      />
                    </div>
                  </div>
                  <div className="py-3">
                    <h5 className="title-1">{item?.title}</h5>
                    <h6 className="price-1 text-danger">
                      {item?.price?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h6>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default WishList;
