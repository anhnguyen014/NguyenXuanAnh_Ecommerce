import { Navigate } from "react-router-dom";

export const PrivateRouters = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  //   console.log(getTokenFromLocalStorage.token);
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
