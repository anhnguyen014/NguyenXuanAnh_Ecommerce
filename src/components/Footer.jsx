import React, { useEffect, useState } from "react";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import newsletter from "../images/newsletter.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  getProductByCate,
} from "../features/products/productSlice";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();

  const productState = useSelector((state) => state?.product?.products);

  useEffect(() => {
    let newCategories = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newCategories.push(element?.category);
    }
    setCategories(newCategories);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [category]);
  const getProducts = () => {
    dispatch(getAllProduct({ category }));
  };

  return (
    <>
      {/* <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className=" mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address..."
                  aria-label="Your Email Address..."
                  aria-describedby="basic-addon2"
                />
                <span
                  className="input-group-text p-2 text-white "
                  id="basic-addon2"
                >
                  Đăng ký
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Liên hệ với chúng tôi</h4>
              <div>
                <address className="text-white fs-6">
                  Địa chỉ :Đường 22, Phường Phước Long B
                  <br /> Thành phố Thủ Đức, Thành phố Hồ Chí Minh <br />
                  PinCode: 123258
                </address>
                <a
                  href="tel:+84 333853839"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +84 333853839
                </a>
                <a
                  href="mailto:anhnguyen.100499@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  anhnguyen.100499@gmail.com
                </a>
                <div className="social_icons d-flex  align-items-center gap-30 mt-4">
                  <Link className="text-white" to="">
                    <BsLinkedin className="fs-4" />
                  </Link>
                  <Link className="text-white" to="">
                    <BsInstagram className="fs-4" />
                  </Link>
                  <Link className="text-white" to="">
                    <BsGithub className="fs-4" />
                  </Link>
                  <Link className="text-white" to="">
                    <BsYoutube className="fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className=" d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="/privacy-policy">
                  Chính sách bảo mật
                </Link>
                <Link className="text-white py-2 mb-1" to="/refund-policy">
                  Chính sách hoàn tiền
                </Link>
                <Link className="text-white py-2 mb-1" to="/shipping-policy">
                  Chính sách vận chuyển
                </Link>
                <Link className="text-white py-2 mb-1" to="tern-condition">
                  Điều khoản và điều kiện
                </Link>
                <Link className="text-white py-2 mb-1" to="/blog">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1" to="">
                  About Us
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  Faq
                </Link>
                <Link className="text-white py-2 mb-1" to="">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                {categories &&
                  [...new Set(categories)]?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="text-white py-2 mb-1"
                        to={"/product/category/" + item}
                        onClick={() => dispatch(getProductByCate(item))}
                      >
                        {item}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Developer's Anh
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
