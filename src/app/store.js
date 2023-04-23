import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import brandReducer from "../features/brands/brandSlice";
import categoryReducer from "../features/categories/categorySlice";

import contactReducer from "../features/contact/contactSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    brand: brandReducer,
    category: categoryReducer,
  },
});
