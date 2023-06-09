import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const userState = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      // console.log(userState.isSuccess);

      // alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    if (userState.user !== null && userState.isError === false) {
      navigate("/");
    }
  }, [userState]);
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Đăng nhập" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 ">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng Nhập</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-30"
              >
                <CustomInput
                  type="text"
                  name="username"
                  placeholder="Tên tài khoản"
                  value={formik.values.username}
                  onChange={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                />
                <div className="error">
                  {formik.touched.username && formik.errors.username}{" "}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                  <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                    <button className="button">Đăng nhập</button>
                    <Link to="/register" className="button signup">
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
