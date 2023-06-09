import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/enquiry/Enquiries";
import Bloglist from "./pages/blog/Bloglist";
import BlogCateList from "./pages/blog/BlogCateList";
import Order from "./pages/orders/Order";
import Customer from "./pages/customers/Customer";
import Colorlist from "./pages/colors/Colorlist";
import Categorylist from "./pages/category/Categorylist";
import Brandlist from "./pages/brand/Brandlist";
import Productlist from "./pages/products/Productlist";
import AddBlog from "./pages/blog/AddBlog";
import AddBlogCat from "./pages/blog/AddBlogCat";
import AddColor from "./pages/colors/AddColor";
import AddCategory from "./pages/category/AddCategory";
import AddBrand from "./pages/brand/AddBrand";
import AddProduct from "./pages/products/AddProduct";
import AddCoupon from "./pages/coupon/AddCoupon";
import CouponList from "./pages/coupon/CouponList";
import ViewEnq from "./pages/enquiry/ViewEnq";
import PromotionList from "./pages/promotion/PromotionList";
import AddPromotion from "./pages/promotion/AddPromotion";
import ViewOrder from "./pages/orders/ViewOrder";
import { PrivateRouters } from "./routing/PrivateRouters";
import { OpenRouters } from "./routing/OpenRouters";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRouters>
              <Login />
            </OpenRouters>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admin"
          element={
            <PrivateRouters>
              <MainLayout />
            </PrivateRouters>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiry/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category-list" element={<BlogCateList />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="blog-category" element={<AddBlogCat />} />
          <Route path="blog-category/:id" element={<AddBlogCat />} />
          <Route path="orders" element={<Order />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customer />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="add-color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="promotion-list" element={<PromotionList />} />
          <Route path="add-promotion" element={<AddPromotion />} />
          <Route path="promotion/:id" element={<AddPromotion />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />
          <Route path="add-coupon" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
