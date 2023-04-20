import { Navigate } from "react-router-dom";

export const OpenRouters = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  //   console.log(getTokenFromLocalStorage.token);
  return getTokenFromLocalStorage?.token === undefined ? (
    children
  ) : (
    <Navigate to="/admin" replace={true} />
  );
};
