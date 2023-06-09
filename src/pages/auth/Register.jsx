import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import Meta from "../../components/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is not valid"),
  mobile: yup.string().required("Mobile number is required"),
  password: yup.string().required("Password is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      // formik.resetForm();
      // alert(JSON.stringify(values, null, 2));
    },
  });

  // useEffect(() => {
  //   if (authState.isError === false && authState.createdUser !== null) {
  //     navigate("/login");
  //   }
  // }, [authState]);

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Đăng ký" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 ">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng Ký</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="Nhập họ"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Nhập tên"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustomInput
                  type="text"
                  name="userName"
                  placeholder="Tên tài khoản"
                  value={formik.values.username}
                  onChange={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                />
                <div className="error">
                  {formik.touched.username && formik.errors.username}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Số điện thoại"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
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
                  <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                    <button className="button">Đăng ký</button>
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

export default Register;
