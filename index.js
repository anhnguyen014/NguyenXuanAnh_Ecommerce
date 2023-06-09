const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandle } = require("./middlewares/errorHandle");
const dotenv = require("dotenv").config();
const authRoute = require("./routers/authRoute");
const productRoute = require("./routers/productRoute");
const blogRoute = require("./routers/blogRoute");
const categoryRoute = require("./routers/categoryRoute");
const blogCateRoute = require("./routers/blogCateRoute");
const brandRoute = require("./routers/brandRoute");
const colorRoute = require("./routers/colorRoute");
const contactRoute = require("./routers/contactRoute");
const uploadRoute = require("./routers/uploadRoute");
const couponRoute = require("./routers/couponRoute");
const promotionRoute = require("./routers/promotionRoute");

const cors = require("cors");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);
app.use("/api/blog_category", blogCateRoute);
app.use("/api/brand", brandRoute);
app.use("/api/color", colorRoute);
app.use("/api/contact", contactRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/promotion", promotionRoute);

app.use(notFound);
app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
