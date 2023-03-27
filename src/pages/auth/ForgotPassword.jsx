import React from "react";
import CustomInput from "../../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center fs-4">Forgot Password</h3>
        <p className="text-center fs-6">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          <CustomInput type="email" placeholder="Email Address" id="email" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="Submit"
            style={{ background: "#ffd333" }}
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
