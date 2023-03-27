import React from "react";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import About from "./pages/home/About";
import Contact from "./pages/home/Contact";
import OurStore from "./pages/product/OurStore";
import Blog from "./pages/blog/Blog";
import CompareProduct from "./pages/product/CompareProduct";
import WishList from "./pages/wishlist/WishList";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import SingleBlog from "./pages/blog/SingleBlog";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import RefundPolicy from "./pages/policy/RefundPolicy";
import ShippingPolicy from "./pages/policy/ShippingPolicy";
import TernAndConditions from "./pages/policy/TernAndConditions";
import SingleProduct from "./pages/product/SingleProduct";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="tern-condition" element={<TernAndConditions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
